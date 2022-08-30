# Deno Starter Template for Run On Slack apps

This repo is a starter template for new Run On Slack apps. This template uses Deno and the Slack CLI.

Before getting started, make sure you have a development workspace where you have permissions to install apps. If you don’t have one set up, go ahead and [create one](https://slack.com/create).

## Installation

#### Prerequisites

To use this template, you will need to have installed and configured the Slack CLI. 
Do this by following our [Quickstart Guide](https://api.slack.com/future/quickstart).

#### Get Started

Make a Run On Slack app with this with repo by **creating an app from this template**, **configuring your app**, then **writing functions**. 

Once you're done, you can run your app with the CLI's local development server or Deploy your app to production.

### Setup Your Project

```zsh
# Clone this project onto your machine
slack create my-app -t slack-samples/deno-starter-template

# Change into this project directory
cd my-app

# Run app locally
slack run

# Deploy app
slack deploy
```

#### Configuring Your App

The first thing we'll do is configure our app's manifest. This will let us configure things like our app's name and the [scopes](https://api.slack.com/scopes) it requires.

Open the manifest file, `manifest.ts`, in your project's root directory. 

In the `Manifest` configuration, set your app's `name` and `description`:

```ts
export default Manifest({
  name: "starter-template", // Change this
  description: "A starter template.", // Change this
  icon: "assets/icon.png",
  functions: [],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
```

#### Running Your App Locally

While building your app, you can see your changes propagated to your workspace in real-time with `slack run`.

Executing `slack run` starts a local development server, syncing changes to your workspace's development version of your app. (You'll know it's the development version because the name has the string `(dev)` appended).

Your local development server is ready to go when you see the following:

```zsh
Connected, awaiting events

```

When you want to turn off the local development server, use `Ctrl+c` in the command prompt.

#### Writing Functions

On our [next-generation platform](https://api.slack.com/future), you can build **Run On Slack functions**, reusable building blocks of automation that are deployed to Slack and accept inputs, perform some calculations, and provide outputs. 

To create a Run On Slack function:

* **define** the function in the Manifest, then 
* **implement** the function in its respective source file.

##### Define Your Function

In your `manifest.ts` file, define a function with `DefineFunction` like this:

```ts
const MyFunction = DefineFunction({
  callback_id: "a_unique_callback_id", 
  title: "Do Something",        
  description: "A short, helpful sentence about your app.",
  source_file: "functions/my_function.ts",
  input_parameters: {
    properties: {},
    required: [],
  },
  output_parameters: {
    properties: {},
    required: [],
  }
});
```

<details>
<summary><b>Deep dive into function definitions</b></summary>

Let's look at each property in detail:

* **`callback_id` is a unique string identifier.** This is used internally, 
  and also for raising issues about this function.
* **`title` is how others will see your function.** For example, if you have a 
  Global shortcut function `GetCustomerProfileFunction`, you might set your `callback_id` to be `get_customer_profile_function`.
* **`description` is a succinct summary of what your function does.**
* **`source_file` is where your function is implemented,** relative to the root of
  your project. 
* **`input_parameters` is where you configure your function's inputs.**
* **`output_parameters` is where you configure your function's outputs.**

Both `input_parameters` and `output_parameters` can be an object with further 
sub-properties:
  
* `type` is the type of the input parameter. The supported types are string, boolean, object, and array. Support for more types coming soon.
* `description` is a string description of the input parameter.

Define inputs to and outputs for your functions in the `properties` of `input_parameters` and `output_parameters`, respectively, like this:

```ts
parameterName: {
  type: Schema.type.string, // See more supported types below
  description: "A short description"
}
```

For example, let's say you want to create a function that takes two string inputs, `firstName` and `lastName`, and produces a string output called `fullName`. Your function definition might look something like this:

```js
const GetCustomerFullName = DefineFunction({
  callback_id: "get_customer_full_name", 
  title: "Get Customer Full Name",        
  description: "Given a first and last name, returns the full name.",
  source_file: "functions/get_customer_full_name.ts",
  input_parameters: {
    properties: {
      firstName: {
        type: Schema.types.string,
        description: "The customer's first name"
      },
      lastName: {
        type: Schema.types.string,
        description: "The customer's last name"
      }
    },
    required: []
  },
  output_parameters: {
    properties: {
      fullName: {
        type: Schema.types.string,
        description: "The customer's full name"
      }
    },
    required: []
  }
});
```

If you want to set a property as required, list its name in its respective `required` property.

For example, if you have an input parameter named `customer_id` that you 
want to be required, you can do so like this:

```js
input_parameters: {
  properties: {
    customer_id: {
      type: Schema.types.string,
      description: "The customer's ID"
    }
  },
  required: ["customer_id"]
}
```

</details>

##### Implement Your Function

With your function defined in the manifest file, you can now implement your function in its respective source file. 

Create a file with a name corresponding to your function's name:

```zsh
$ touch functions/my_function.ts
```

In your function's source file, use one of the following templates to implement your function:

<details>
<summary><b>Function template</b></summary>

```ts
import { SlackFunction } from "deno-slack-sdk/mod.ts";

// Import your function's definition here
import { MyFunction } from "../manifest.ts";

// Construct your Slack function handler, using your function's definition 
// to enforce input and output requirements:
export default SlackFunction(MyFunction, ({ inputs, env }) => {
  return {
    outputs: {},
  };
});
```

</details>

<details>
<summary><b>Async function template</b></summary>

```ts
import { SlackFunction } from "deno-slack-sdk/mod.ts";

// Import your function's definition here
import { MyFunction } from "../manifest.ts";

// Construct your Slack function handler, using your function's definition 
// to enforce input and output requirements:
export default SlackFunction(MyFunction, async ({ inputs, env }) => {
  return await {
    outputs: {},
  };
});
```

</details>

A function's implementation must be the default export of the source file. You can use result of calling `SlackFunction()` with your function's definition (the result of calling `DefineFunction()`) so that your required inputs and outputs will be enforced.

#### Deploying Your App to Slack

When you're done developing your app, you can deploy it directly to Slack with `slack deploy`.

## Using the Slack CLI
To learn more about development with the CLI, you can visit the following guides:
- [Creating a new app with the CLI](https://api.slack.com/future/create)
- [Configuring your app](https://api.slack.com/future/manifest)
- [Developing locally](https://api.slack.com/future/run)
To view all documentation and guides available for the CLI, visit the [Overview page](https://api.slack.com/future/overview).

When using the CLI to develop your app, here are some helpful commands:
- `slack version`: Checks your current version of the Slack CLI.
- `slack upgrade`: Checks for updates for current SDK and CLI versions and upgrades them as needed.
- `slack auth list`: Lists all workspaces the CLI is logged into.
- `slack auth login`: Allows you to log in to a new or inactive workspace with the CLI.
To view all other commands available in the CLI, run `slack help`.

## Project Structure

### `manifest.ts`

`manifest.ts` is a configuration for Slack CLI apps using Deno. This file will establish all basic configurations for your application, including app name and description.

### `slack.json`

`slack.json` is a required file for running Slack CLI apps. This file is a way for the CLI to interact with your project's SDK. It defines script hooks which are *executed by the CLI* and *implemented by the SDK.*
