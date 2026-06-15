const DEFAULT_ENV = '';

export function initCloud(): boolean {
  if (!wx.cloud) {
    console.warn('当前基础库不支持 wx.cloud');
    return false;
  }

  const cloudConfig = {
    traceUser: true
  } as ICloudConfig;

  if (DEFAULT_ENV) {
    cloudConfig.env = DEFAULT_ENV;
  }

  wx.cloud.init(cloudConfig);

  return true;
}

export function callCloudFunction<TData extends WechatMiniprogram.IAnyObject, TResult>(
  name: string,
  data?: TData
): Promise<TResult> {
  return wx.cloud.callFunction({
    name,
    data
  }).then((response) => response.result as TResult);
}
