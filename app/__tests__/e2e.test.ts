import * as WebdriverIO from 'webdriverio';

if (
  process.env.E2E_PLATFORM !== 'Android' &&
  process.env.E2E_PLATFORM !== 'iOS'
) {
  throw new Error('`E2E_PLATFORM` must be either "Android" or "iOS".');
}

describe('Appium with Jest automation testing', () => {
  let client: WebdriverIO.Browser<'async'>;

  beforeAll(async () => {
    await initializeClient();
    await waitForApp(); // it helps on the CI
  });

  async function initializeClient() {
    const android = {
      platformName: 'Android',
      app:
        process.env.E2E_MODE === 'debug'
          ? './android/app/build/outputs/apk/debug/app-debug.apk'
          : './android/app/build/outputs/apk/release/app-release.apk',
      automationName: 'UiAutomator2',
      uiautomator2ServerInstallTimeout: 60_000,
    };

    const ios = {
      platformName: 'iOS',
      deviceName: process.env.E2E_IOS_SIMULATOR_NAME,
      platformVersion: process.env.E2E_IOS_SIMULATOR_VERSION,
      bundleId: 'org.reactjs.native.example.' + process.env.E2E_APP_NAME,
      automationName: 'XCUITest',
    };

    const opts = {
      path: '/wd/hub',
      port: 4723,
      capabilities: process.env.E2E_PLATFORM === 'Android' ? android : ios,
    };

    client = await WebdriverIO.remote(opts);
    if (
      process.env.CI === 'true' &&
      process.env.E2E_PLATFORM === 'ios' &&
      process.env.E2E_MODE === 'release'
    ) {
      client = await WebdriverIO.remote(opts); // for some reason on CI it works on the second time
    }
    if (!client) {
      fail('Failed to initialize client');
    }
  }

  async function waitForApp() {
    for (let i = 0; i < 60; i++) {
      const button = await client.$('~HelloWorld');
      try {
        await button.getText();
        return;
      } catch (e) {
        await client.pause(1000);
      }
    }
    fail('App is not launched');
  }

  afterEach(async () => {
    // await client.reset();
    // await waitForApp();

    const button = await client.$('~menu');
    await button.click();
    await client.pause(1000);
  });

  afterAll(async () => {
    await client.deleteSession();
  });

  async function openTest(name: string) {
    const button = await client.$('~' + name);
    await button.click();
    await client.pause(1000);
  }

  test('hello world', async () => {
    await openTest('HelloWorld');

    async function expectTextToBe(id: string, expected: string | undefined) {
      const text = await client.$(id);
      const string = await text.getText();
      expect(expected).toBeDefined();
      expect(string).toBe(expected);
    }

    await expectTextToBe('~text', 'Hello world!');
    await expectTextToBe(
      '~reactNativeVersion',
      process.env.E2E_REACT_NATIVE_VERSION,
    );
    await expectTextToBe('~platform', process.env.E2E_PLATFORM);
    await expectTextToBe('~mode', process.env.E2E_MODE);
    await expectTextToBe('~architecture', process.env.E2E_ARCHITECTURE);
    await expectTextToBe('~runtime', process.env.E2E_RUNTIME);
  });

  test('worklets', async () => {
    await openTest('Worklets');

    const text = await client.$('~text');
    const button = await client.$('~button');

    const before = await text.getText();
    expect(before).toEqual('?');

    await button.click();
    await client.pause(500);

    const after = await text.getText();
    expect(after).toEqual('OK');
  });

  test('animate background color', async () => {
    await openTest('AnimateBackgroundColor');

    const button = await client.$('~button');

    const before = await client.takeScreenshot();

    await button.click();
    await client.pause(2500);

    const after = await client.takeScreenshot();

    // TODO: compare pixel colors
    expect(after).not.toBe(before);
  });

  test('animate width', async () => {
    await openTest('AnimateWidth');

    const box1 = await client.$('~box1');
    const box2 = await client.$('~box2');
    const button = await client.$('~button');

    const before1 = await box1.getSize();
    const before2 = await box2.getSize();

    await button.click();
    await client.pause(1000);

    const after1 = await box1.getSize();
    const after2 = await box2.getSize();

    expect(after1.width).not.toBe(before1.width);
    expect(after2.width).not.toBe(before2.width);
  });

  test('animate text', async () => {
    await openTest('AnimateText');

    const text = await client.$('~text');
    const button = await client.$('~button');

    const before = await client.takeElementScreenshot(text.elementId);
    // `text.getText()` always returns an empty string on Fabric, so we must compare screenshots

    await button.click();
    await client.pause(2000);

    const after = await client.takeElementScreenshot(text.elementId);
    expect(after).not.toEqual(before);
  });

  test('animate svg', async () => {
    await openTest('AnimateSvg');

    const svg = await client.$('~svg');
    const button = await client.$('~button');

    const before = await client.takeElementScreenshot(svg.elementId);

    await button.click();
    await client.pause(2000);

    const after = await client.takeElementScreenshot(svg.elementId);
    expect(after).not.toEqual(before);
  });

  test('scroll to', async () => {
    await openTest('ScrollTo');

    const box = await client.$('~box-orange'); // for some reason it doesn't work with ~box-red
    const button = await client.$('~Button');

    const before = await box.getLocation();

    await button.click();
    await client.pause(2000);

    const after = await box.getLocation();

    expect(after.y).not.toBe(before.y);
  });

  test('integration with react-native-gesture-handler', async () => {
    await openTest('GestureHandlerDragDrop');

    const ball = await client.$('~ball');

    const before = await ball.getLocation();
    expect(before.x).toEqual(0);

    await client.touchPerform([
      {action: 'press', options: {x: 100, y: 100}},
      {action: 'wait', options: {ms: 100}},
      {action: 'moveTo', options: {x: 100, y: 101}}, // this is just to activate the gesture in y-axis, so the result in x-axis is correct
      {action: 'wait', options: {ms: 100}},
      {action: 'moveTo', options: {x: 100, y: 100}},
      {action: 'wait', options: {ms: 500}},
      {action: 'moveTo', options: {x: 300, y: 100}},
      {action: 'wait', options: {ms: 100}},
      {action: 'release'},
    ]);
    await client.pause(500);

    const after = await ball.getLocation();
    expect(after.x).toEqual(200);
  });

  if (process.env.E2E_MODE === 'debug') {
    test('reload once', async () => {
      await openTest('Reload');
      await client.pause(process.env.CI === 'true' ? 10_000 : 1000);

      const button = await client.$('~button');
      await button.click(); // reload app
      await client.pause(process.env.CI === 'true' ? 30_000 : 1000);
      waitForApp();

      await openTest('Reload');
      await client.pause(process.env.CI === 'true' ? 10_000 : 1000);
    });
  }
});
