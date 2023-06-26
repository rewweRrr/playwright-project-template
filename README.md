# Autotests

## Overview

TBD

## Modules

This project consists of three modules, solving different problems:
- [Tests](src/tests/README.md)

## Preparing a workspace

1. **Install the dependencies**
   
   ```bash
   npm install
   ```
   This will install all NPM dependencies, download the browsers and initialize Git hooks

2. **Set environment variables**

   All the tools use environment variables for configuration.
   Typically, you'd like to set at least `ENV` variable in order to specify an environment, where your scripts will be running.
   Please, see [Environment Variables](#environment-variables) section for more details.

3. **You are all set up!**

   Dive in in a specific [module](#modules) details for further steps.

## Environment Variables

### How to Set

You can use either classical approach of setting environment variables in your system, or use a special `.env` file, created in the root of this project.
System variables will have precedence over the file ones.

You can check an example of `.env` file content [here](.env.dev-example).

> **Warning!**
> 
> `.env` file is a representation of your local settings and should not be committed.

### List of Supported Variables

| Variable           | Description                                                                                                                                                                                           |
|--------------------| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENV`              | Defines an environment to run scripts at. A list of available values can be found in the [env.ts](src/common/config/envs.ts) file.                                                                    |
| `APP_URL`          | Enforces portal URL, even if it differs from the one defined in the selected environment. Useful, when you'd like to run scripts on a local portal instance with a specific environment as a backend. |
| `CI`               | If set, indicates that the scripts are running on the CI job, which alters reporting settings and browsers list.                                                                                      |
| `CI_ENABLE_WEBKIT` | Enables Webkit tests, used only when `CI` variable is set.                                                                                                                                            |


## Best Practices

### Selectors

Selectors used in our scripts should be as close to real user behavior as possible.
That means, that we should prioritize such selectors as text, roles, labels, placeholders, relative positioning and so on.

If, for some reason, it is not possible, we should use test automation marks.
They are actually just classes with special naming starting with `ta` and written in camel case. For example: `taLoader`.  
There is plenty of such marks in our UI already, initially made for TA team. Feel free to add new ones, if it's not possible to use user-facing attributes.

In any circumstances you should avoid selector tight to implementation such as:
```ts
await page.locator('#tsf > div:nth-child(2) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > input').click();
await page.locator('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input').click();
```

Check [the official documentation](https://playwright.dev/docs/best-practices) for more details on selectors best practices.


## Recording Scripts

You can record scripts just by performing actions as a regular user would do. In order to run code generator, execute the following command in the terminal:
```bash
npm run codegen
```
