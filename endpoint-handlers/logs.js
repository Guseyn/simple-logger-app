export const domainLogs = [
  '**[INFO]** *user:* Account session initialized',
  '**[INFO]** *user:* Profile data loaded',
  '**[WARN]** *user:* Optional profile field missing',
  '**[INFO]** *user:* Preferences applied',
  '**[INFO]** *user:* Authentication state verified',

  '**[INFO]** *studio:* Studio configuration loaded',
  '**[INFO]** *studio:* Branding settings applied',
  '**[WARN]** *studio:* Incomplete studio profile detected',
  '**[INFO]** *studio:* Visibility rules evaluated',
  '**[INFO]** *studio:* Public page prepared',

  '**[INFO]** *instructor:* Instructor profile activated',
  '**[INFO]** *instructor:* Availability schedule evaluated',
  '**[WARN]** *instructor:* Availability overlap detected',
  '**[INFO]** *instructor:* Lesson rules resolved',
  '**[INFO]** *instructor:* Teaching preferences applied',

  '**[INFO]** *student:* Student profile linked',
  '**[INFO]** *student:* Lesson access granted',
  '**[WARN]** *student:* Missing guardian information',
  '**[INFO]** *student:* Progress state updated',
  '**[INFO]** *student:* Notifications enabled',

  '**[INFO]** *lesson:* Lesson session prepared',
  '**[INFO]** *lesson:* Lesson content resolved',
  '**[WARN]** *lesson:* Lesson notes incomplete',
  '**[INFO]** *lesson:* Lesson state synchronized',
  '**[INFO]** *lesson:* Lesson session finalized',

  '**[INFO]** *schedule:* Schedule rules evaluated',
  '**[WARN]** *schedule:* Schedule conflict detected',
  '**[INFO]** *schedule:* Time window normalized',
  '**[INFO]** *schedule:* Recurrence pattern applied',
  '**[INFO]** *schedule:* Schedule committed',

  '**[INFO]** *invoice:* Invoice draft created',
  '**[INFO]** *invoice:* Pricing rules applied',
  '**[WARN]** *invoice:* Optional tax information missing',
  '**[INFO]** *invoice:* Invoice marked as payable',
  '**[INFO]** *invoice:* Invoice delivery scheduled',

  '**[INFO]** *payment:* Payment intent prepared',
  '**[WARN]** *payment:* Payment method requires confirmation',
  '**[INFO]** *payment:* Payment authorization verified',
  '**[INFO]** *payment:* Payment status updated',
  '**[INFO]** *payment:* Payment workflow completed',

  '**[INFO]** *notification:* Notification template resolved',
  '**[INFO]** *notification:* Notification queued',
  '**[WARN]** *notification:* Notification delivery delayed',
  '**[INFO]** *notification:* Notification dispatched',
  '**[INFO]** *notification:* Notification state synchronized'
]

export default async function ({ stream, headers }) {
  stream.respond({
    ':status': 200,
    'content-type': 'text/event-stream; charset=utf-8',
    'cache-control': 'no-cache, no-store',
    'content-encoding': 'none',
  })

  stream.write(': connected\n\n')

  let counter = 0

  const interval = setInterval(() => {
    counter++
    console.log(counter)

    stream.write(
      `id: ${counter}\n` +
      `event: log\n` +
      `data: ${JSON.stringify({
        count: counter,
        message: domainLogs[Math.floor(Math.random() * 45)]
      })}\n\n`
    )
  }, 1000)

  const cleanup = (event) => {
    clearInterval(interval)
    try {
      stream.end()
    } catch {}
  }

  stream.on('aborted', () => {
    cleanup('aborted')
  })
  stream.on('close', () => {
    cleanup('close')
  })
  stream.on('error', () => {
    cleanup('error')
  })
}
