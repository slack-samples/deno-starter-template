# .devcontainer

A [development container][container] provides a predefined environment with
some tools needed for development, which can be useful in editors such as
[Visual Studio Code][vscode] or remote settings like [Codespaces][codespaces].

This specific container packages [the Slack CLI][cli] with the project runtime
and a few development tools. The `Dockerfile` details the container.

## Editor extensions

Modifications to an editor can be made with changes to the `devcontainer.json`
file:

```diff
{
    "customizations": {
        "vscode": {
            "extensions": [
+               "GitHub.copilot",
                "denoland.vscode-deno",
                "ms-azuretools.vscode-docker"
            ],
+           "settings": {
+               "terminal.integrated.defaultProfile.linux": "zsh"
+           }
        }
    }
}
```

[codespaces]: https://github.com/features/codespaces
[cli]: https://api.slack.com/automation/cli
[container]: https://containers.dev/
[vscode]: https://code.visualstudio.com/docs/devcontainers/containers
