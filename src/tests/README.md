# Tests

This folder contains everything related to functional testing.

## Execution

```bash
npm run test
```

### Shortcut Scripts

| Script               | Description                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| `test:headed`        | Runs the tests in headed mode using only 1 worker                               |
| `test:debug`         | Same as `test:headed` + opens debug tool and break on each test execution start |
| `test:chrome`        | Runs the tests using Chrome only                                                |
| `test:chrome:headed` | Same as `test:headed` but using Chrome only                                     |
| `test:chrome:debug`  | Same as `test:debug` but using Chrome only                                      |
| `show-report`        | Shows the HTML report from the last test run                                    |
| `show-job-report`    | Shows the HTML report from the specified ZIP archive from the CI job run        |

### Running Tests in a Specific Browser

By default tests are run in all the browsers specified in a `projects` section of `playwright.config.ts`. If you'd like to run the tests only for a specific browser, you can use `--project` argument as this:

```bash
npm run test -- --project="safari:mobile"
```

For Chrome you can also use predefined set of shortcut scripts: `test:chrome`, `test:chrome:headed` and `test:chrome:debug`.

### Specifying Workers Count

Playwright tries to execute tests in parallel in order to improve test execution speeds.

By default it uses number of workers equal to half of a number of your CPU cores.  
You can explicitly set the amount of workers in order to improve execution speed or free up some computational power.
You can do it by adding an additional argument as follows:
```bash
npm run test -- --workers=2
```

### Additional Arguments

Full list of arguments can be found in [the official documentation](https://playwright.dev/docs/test-cli).

### Extension

In case you are using Visual Studio Code, give a try to [the official Playwright extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright), which allows running and debugging tests in a more convenient way.
