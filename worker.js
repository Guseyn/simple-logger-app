import fs from 'fs'
import path from 'path'

import server from '#nodes/server.js'
import app from '#nodes/app.js'
import src from '#nodes/src.js'
import endpoint from '#nodes/endpoint.js' 

const baseFolder = 'static'

import logs from '#endpoint-handlers/logs.js'

server(
  app({
    indexFile: './static/html/index.html', 
    static: [
      src(/^\/(html|css|js|image|md|font)/, {
        baseFolder
      })
    ],
    api: [
      endpoint('/logs/', 'GET', logs)
    ]
  })
)()
