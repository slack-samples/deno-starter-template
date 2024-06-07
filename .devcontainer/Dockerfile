# Use the Ubtuntu base image
FROM ubuntu:22.04

# Download development tools
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y git
RUN apt-get install -y unzip

# Run the container as a user
RUN useradd -m -s /bin/bash slackdev
RUN chown slackdev /usr/local/bin
USER slackdev

# Install the project runtime
RUN curl -fsSL https://deno.land/install.sh | sh
RUN export DENO_INSTALL="/home/slackdev/.deno"
RUN export PATH="$DENO_INSTALL/bin:$PATH"

# Set the working directory
WORKDIR /workspaces

# Install the Slack CLI
RUN curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash -s -- -d
