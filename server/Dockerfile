FROM denoland/deno:2.2.3

# Create working directory
WORKDIR /server

# Copy source
COPY . .

# Install dependencies
RUN deno install

# Run the app
CMD ["deno", "run", "--allow-net", "main.ts"]
