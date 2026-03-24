const https = require('https')

const {
  WX_APP_ID,
  WX_APP_SECRET,
  WX_TEMPLATE_ID,
  WX_OPEN_ID,
  BUILD_STATUS,
  BUILD_REPO,
  BUILD_REF,
  BUILD_RUN_URL,
} = process.env

function request(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body)
    const urlObj = new URL(url)
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: body ? 'POST' : 'GET',
      headers: body
        ? {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
          }
        : {},
    }

    const req = https.request(options, (res) => {
      let raw = ''
      res.on('data', (chunk) => (raw += chunk))
      res.on('end', () => {
        try {
          resolve(JSON.parse(raw))
        } catch {
          resolve(raw)
        }
      })
    })

    req.on('error', reject)
    if (body) req.write(data)
    req.end()
  })
}

async function getAccessToken() {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WX_APP_ID}&secret=${WX_APP_SECRET}`
  const res = await request(url)
  if (!res.access_token)
    throw new Error(`获取 access_token 失败: ${JSON.stringify(res)}`)
  return res.access_token
}

async function sendTemplateMessage(accessToken, openid) {
  const isSuccess = BUILD_STATUS === 'success'

  const body = {
    touser: openid,
    template_id: WX_TEMPLATE_ID,
    url: BUILD_RUN_URL,
    data: {
      first: {
        value: isSuccess ? '✅ 发包成功' : '❌ 发包失败',
        color: isSuccess ? '#09BB07' : '#E64340',
      },
      keyword1: { value: BUILD_REPO },
      keyword2: { value: BUILD_REF },
      keyword3: {
        value: new Date().toLocaleString('zh-CN', {
          timeZone: 'Asia/Shanghai',
        }),
      },
      remark: {
        value: isSuccess
          ? '所有包已发布到 npm，点击查看详情。'
          : '发布流程出现错误，请点击查看 Actions 日志。',
      },
    },
  }

  const res = await request(
    `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessToken}`,
    body,
  )

  if (res.errcode !== 0)
    throw new Error(`发送失败 (openid: ${openid}): ${JSON.stringify(res)}`)
  console.log(`✔ 消息已发送给 ${openid}`)
}

;(async () => {
  try {
    const token = await getAccessToken()
    const openids = WX_OPEN_ID.split(',')
      .map((id) => id.trim())
      .filter(Boolean)
    await Promise.all(openids.map((id) => sendTemplateMessage(token, id)))
    console.log('🎉 微信通知发送完成')
  } catch (err) {
    console.error('微信通知失败:', err.message)
    process.exit(0)
  }
})()
