import { launch as puppeteerLaunch } from 'puppeteer'
import path from 'path'

import type { Browser } from 'puppeteer'

const pathToExtension = path.join(__dirname, '../dist')

export function launch(times = 0): Browser {
  return (() => {
    try {
      return puppeteerLaunch({
        executablePath: process.env.PUPPETEER_EXEC_PATH,
        headless: false,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          `--disable-extensions-except=${pathToExtension}`,
          `--load-extension=${pathToExtension}`,
        ],
      })
    } catch (error) {
      if (times === 5) throw Error(error)
      else return launch(times + 1)
    }
  })() as Browser
}
