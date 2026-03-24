import https from 'https'

const {
  FEISHU_WEBHOOK_URL, // 飞书机器人 Webhook 地址
  BUILD_STATUS,
  BUILD_REPO,
  BUILD_REF,
  BUILD_RUN_URL,
} = process.env

console.log('process.env', process.env)

function request(url, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body)
    const urlObj = new URL(url)
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
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
    req.write(data)
    req.end()
  })
}

;(async () => {
  try {
    const isSuccess = BUILD_STATUS === 'success'

    const body = {
      msg_type: 'interactive',
      card: {
        header: {
          title: {
            tag: 'plain_text',
            content: isSuccess ? '✅ 发包成功' : '❌ 发包失败',
          },
          template: isSuccess ? 'green' : 'red',
        },
        elements: [
          {
            tag: 'div',
            fields: [
              {
                is_short: true,
                text: { tag: 'lark_md', content: `**仓库**\n${BUILD_REPO}` },
              },
              {
                is_short: true,
                text: { tag: 'lark_md', content: `**分支**\n${BUILD_REF}` },
              },
              {
                is_short: true,
                text: {
                  tag: 'lark_md',
                  content: `**时间**\n${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`,
                },
              },
              {
                is_short: true,
                text: {
                  tag: 'lark_md',
                  content: `**状态**\n${isSuccess ? '所有包已发布到 npm' : '发布流程出现错误'}`,
                },
              },
            ],
          },
          {
            tag: 'action',
            actions: [
              {
                tag: 'button',
                text: { tag: 'plain_text', content: '查看 Actions 日志' },
                type: isSuccess ? 'primary' : 'danger',
                url: BUILD_RUN_URL,
              },
            ],
          },
        ],
      },
    }

    const res = await request(FEISHU_WEBHOOK_URL, body)
    if (res.code !== 0) {
      throw new Error(`发送失败: ${JSON.stringify(res)}`)
    }
    console.log('🎉 飞书通知发送完成')
  } catch (err) {
    console.error('飞书通知失败:', err.message)
    process.exit(1)
  }
})()
