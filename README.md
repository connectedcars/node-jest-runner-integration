# node-jest-runner-integration

Jest runner that runs integration test in band and units test in parallel

## VSCode

launch.json:
``` json5
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "name": "vscode-jest-tests",
      "request": "launch",
      "args": [
        "--runInBand",
        "--coverage=false",
        "--testTimeout=100000",
        "mysql/common"
      ],
      "cwd": "${workspaceFolder}",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest"
    },
    {
      "name": "jest-runner",
      "type": "node",
      "runtimeArgs": [
        "./node_modules/.bin/jest",
      ],
      "console": "integratedTerminal",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "preLaunchTask": "npm: build:js",
      "outFiles": [
        "${workspaceRoot}/build/dist/**/**.js"
      ],
      "sourceMaps": true,
      "args": [],
      "env": {},
      "internalConsoleOptions": "openOnSessionStart"
    }
  ]
}
```

settings.json:
``` json5
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "typescript"
  ],
  "files.autoSave": "off",
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "build": true
  },
  "git.ignoreLimitWarning": true,
  "[javascripts][javascriptreact][typescript][typescriptreact][json]": {
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "[json][jsonc]": {
    "editor.formatOnSave": true
  }
}
```

tasks.json:
``` json5
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "build",
      "problemMatcher": [
        "$tsc"
      ],
      "group": "build",
      "label": "npm: build",
      "detail": "build -- src"
    }
  ]
}
```
