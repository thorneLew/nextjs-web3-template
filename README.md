# NFT
### setup

```bash
# local
npm run dev

# build
npm run build

# deploy
npm run start
```


### 国际化文案使用
```ts
import { useContext } from "react";
import { I18NContext } from "src/context/I18NContext";

const I18N = useContext(I18NContext)
I18N.common.test
```


### pm2.config.json
```json
{
	"apps": [
		{
			"name": "project_name",
			"script": "PORT=8011 npm run next:start"
		}
	]
}
```

```.env.local
NEXT_PUBLIC_API=
NEXT_MODE= test | prod
```
### project tree
```
.
├── README.md
├── global.d.ts
├── kiwi-config.json
├── next-env.d.ts
├── next.config.js
├── package.json
├── pm2.config.json
├── pont-config.json
├── pontTemplate.ts
├── public
│   ├── favicon.ico
│   ├── static
│   └── vercel.svg
├── src
│   ├── assets
│   ├── component
│   ├── context
│   ├── contract
│   ├── hooks
│   ├── layout
│   ├── pages
│   ├── provider
│   ├── sdk
│   ├── services
│   ├── store
│   ├── styles
│   ├── utils
│   └── view
├── transformTemplate.ts
├── tsconfig.json
├── yarn-error.log
└── yarn.lock

```

