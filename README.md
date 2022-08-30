# Deno Template App

This is a generic Deno template app used to build out Slack apps using the Slack
CLI.

Before getting started, make sure you have a development workspace where you
have permissions to install apps. If you don’t have one set up, go ahead and
[create one](https://slack.com/create).

## Setup

### Install the Slack CLI

To use this template, you first need install and configure the Slack CLI.
Step-by-step instructions can be found in our
[Quickstart Guide](https://api.slack.com/future/quickstart).

## Running Your Project Locally

While building your app, you can see your changes propagated to your workspace
in real-time with `slack run`. You'll know an app is the development version
because the name has the string `(dev)` appended.

```zsh
# Clone this project onto your machine
$ slack create my-app -t slack-samples/deno-starter-template

# Change into this project directory
$ cd my-app

# Run app locally
$ slack run

Connected, awaiting events
```

## Deploying Your App

When you're done with development, you can deploy your app to Slack using
`slack deploy`:

```zsh
# Deploy to a production workspace
$ slack deploy
```

## Project Structure

### `manifest.ts`

Contains the app's configuration. This file defines attributes like app name and
description.

### `slack.json`

Used by the CLI to interact with the project's SDK dependencies. It contains
script hooks that are executed by the CLI and implemented by the SDK.

### `/functions`

[Functions](https://api.slack.com/future/functions) are reusable building blocks
of automation that accept inputs, perform calculations, and provide outputs.
Functions can be used independently or as steps in Workflows.

### `/workflows`

A [Workflow](https://api.slack.com/future/workflows) is a set of steps that are
executed in order. Each step in a Workflow is a function.

Workflows can be configured to run without user input or they can wait for input
via form before continuing to the next step.

### `/triggers`

[Triggers](https://api.slack.com/future/triggers) are how Workflows are
executed.

## Resources

To learn more about developing with the CLI, you can visit the following guides:

- [Creating a new app with the CLI](https://api.slack.com/future/create)
- [Configuring your app](https://api.slack.com/future/manifest)
- [Developing locally](https://api.slack.com/future/run)

To view all documentation and guides available, visit the
[Overview page](https://api.slack.com/future/overview).
