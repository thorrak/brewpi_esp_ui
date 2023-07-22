# BrewPi-ESP Web Interface

This repo contains the source files for the web interface for [BrewPi-ESP](https://github.com/thorrak/brewpi-esp8266). 
This interface is built using Vue3 and Vite.


## Translating

Translation of the app is done using [vue-i18n](https://vue-i18n.intlify.dev/). The translations are stored in 
the `src/locales` folder. The default language is English, and the translations are stored in `en.json`. To add a new 
language, create a new file in the `src/locales` folder with the language code as the name (e.g. `fr.json` for French).

I use [Crowdin](https://crowdin.com/) to manage the translations which presents a much easier interface to use than 
editing raw files, and allows linking screenshots of the interface to individual strings which can help add context to
how a string is used. If you are interested in leveraging Crowdin please reach out on either HomeBrewTalk or 
Discord and I will send you a link that will allow you to contribute to the translations.



## Developing

This repo is of primary interest to developers that are working on extending BrewPi-ESP. To get started, 
[install node](https://nodejs.org/) and [git](https://git-scm.com/) if you don't have them, then clone this repo and 
run `npm install` to install the dependencies. Edit the `localserver` property in `vite.config.json` to point to the web
interface of a BrewPi device running on the same network as your development machine, then run `npm run dev` to start 
the development server. The app will be available at [http://127.0.0.1:5173](http://127.0.0.1:5173).


### Internationalization & PRs

Internationalization of the app is performed using Vue I18n. The translations are stored in the `src/locales` folder.
Ideally, when adding new text you will use the Vue I18n translation directives and add the English strings to the 
translation file (`en.json`), but if you are not familiar/comfortable doing this feel free to submit a PR with hardcoded 
English text and I'll update your PR before merging. 

If you can help with translating new strings to other languages I would appreciate it -- but if you are a monoglot like
me, don't worry about it. 

### Recommended IDE Setup

A free option some people have had success with for development is:
- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

Personally, I use [WebStorm](https://www.jetbrains.com/webstorm/) which is not free, but I find it to be a very good 
IDE -- especially for anyone who is experienced with other JetBrains products like PyCharm or IntelliJ.


### Building/Deploying

Once development is finished, a distributable build can be created by running `npm run build`. This will create a
set of files in the `dist` folder. These files can be copied to the `data` folder of the BrewPi-ESP repo and will be
served by the ESP8266/ESP32.

**Note** - The ESP8266/ESP32 is capable of serving gzipped files -- when you have both a gzipped and a non-gzipped 
version, (e.g. `index.js` and `index.js.gz`) only copy the gzipped version to the ESP's `data` folder in order to keep
the binary size down.
