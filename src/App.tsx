import React, { useState } from 'react';
import { Container, Copy, CheckCircle, Terminal, Database, Globe, Settings, Play, Pause, Trash2, Download, Search, Network, HardDrive, TestTube } from 'lucide-react';

interface Command {
  command: string;
  description: string;
  example?: string;
}

interface CommandSection {
  title: string;
  icon: React.ReactNode;
  commands: Command[];
  color: string;
}

const CommandCard: React.FC<{ command: Command; color: string }> = ({ command, color }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <code className={`text-sm font-mono ${color} bg-gray-50 px-3 py-1 rounded`}>
          {command.command}
        </code>
        <button
          onClick={() => copyToClipboard(command.command)}
          className="ml-2 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          title="Copy command"
        >
          {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-gray-700 mb-3">{command.description}</p>
      {command.example && (
        <div className="bg-gray-50 rounded p-3">
          <p className="text-sm text-gray-600 mb-1">Example:</p>
          <code className="text-xs text-gray-800 block">{command.example}</code>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const commandSections: CommandSection[] = [
    {
      title: "Essential Docker Commands",
      icon: <Container className="w-6 h-6" />,
      color: "text-blue-600",
      commands: [
        {
          command: "docker --version",
          description: "Check Docker version and verify installation",
          example: "Docker version 24.0.6, build ed223bc"
        },
        {
          command: "docker pull <image>",
          description: "Download an image from Docker Hub",
          example: "docker pull nginx:latest"
        },
        {
          command: "docker images",
          description: "List all downloaded images on your system",
          example: "Shows repository, tag, image ID, created date, and size"
        },
        {
          command: "docker run <image>",
          description: "Create and start a new container from an image",
          example: "docker run -d -p 80:80 nginx"
        },
        {
          command: "docker ps",
          description: "List all currently running containers",
          example: "Shows container ID, image, command, status, ports, and names"
        },
        {
          command: "docker ps -a",
          description: "List all containers (running and stopped)",
          example: "Includes exited containers with their exit codes"
        },
        {
          command: "docker stop <container>",
          description: "Gracefully stop a running container",
          example: "docker stop my-nginx-container"
        },
        {
          command: "docker start <container>",
          description: "Start a stopped container",
          example: "docker start my-nginx-container"
        },
        {
          command: "docker restart <container>",
          description: "Restart a running container",
          example: "docker restart my-nginx-container"
        },
        {
          command: "docker rm <container>",
          description: "Remove a stopped container permanently",
          example: "docker rm my-nginx-container"
        },
        {
          command: "docker rmi <image>",
          description: "Remove an image from your system",
          example: "docker rmi nginx:latest"
        },
        {
          command: "docker build -t <name> .",
          description: "Build an image from a Dockerfile in current directory",
          example: "docker build -t my-app:v1.0 ."
        }
      ]
    },
    {
      title: "Advanced Docker Operations",
      icon: <Settings className="w-6 h-6" />,
      color: "text-purple-600",
      commands: [
        {
          command: "docker exec -it <container> /bin/bash",
          description: "Access running container with interactive terminal",
          example: "docker exec -it my-app /bin/bash"
        },
        {
          command: "docker logs <container>",
          description: "View container logs and output",
          example: "docker logs -f my-app (follow logs in real-time)"
        },
        {
          command: "docker inspect <container>",
          description: "Get detailed information about container configuration",
          example: "docker inspect my-app | grep IPAddress"
        },
        {
          command: "docker cp <src> <container>:<dest>",
          description: "Copy files between host and container",
          example: "docker cp ./config.json my-app:/app/config.json"
        },
        {
          command: "docker stats",
          description: "Display real-time resource usage statistics",
          example: "Shows CPU, memory, network I/O, and disk I/O usage"
        },
        {
          command: "docker top <container>",
          description: "Display running processes inside a container",
          example: "docker top my-app"
        },
        {
          command: "docker diff <container>",
          description: "Show changes made to container's filesystem",
          example: "docker diff my-app"
        },
        {
          command: "docker network ls",
          description: "List all Docker networks",
          example: "Shows bridge, host, and custom networks"
        },
        {
          command: "docker network create <name>",
          description: "Create a custom Docker network",
          example: "docker network create my-network"
        },
        {
          command: "docker port <container>",
          description: "Show port mappings for a container",
          example: "docker port my-nginx"
        },
        {
          command: "docker volume ls",
          description: "List all Docker volumes",
          example: "Shows volume names and drivers"
        },
        {
          command: "docker volume create <name>",
          description: "Create a named volume for persistent data",
          example: "docker volume create my-data"
        },
        {
          command: "docker commit <container> <image>",
          description: "Create a new image from container changes",
          example: "docker commit my-app my-app:v2.0"
        },
        {
          command: "docker save -o <file> <image>",
          description: "Export image to a tar archive",
          example: "docker save -o my-app.tar my-app:latest"
        },
        {
          command: "docker load -i <file>",
          description: "Import image from a tar archive",
          example: "docker load -i my-app.tar"
        },
        {
          command: "docker history <image>",
          description: "Show the history and layers of an image",
          example: "docker history nginx:latest"
        },
        {
          command: "docker search <term>",
          description: "Search for images on Docker Hub",
          example: "docker search nginx"
        }
      ]
    },
    {
      title: "Docker Volume Management",
      icon: <HardDrive className="w-6 h-6" />,
      color: "text-green-600",
      commands: [
        {
          command: "docker run -v /host/path:/container/path <image>",
          description: "Mount host directory to container (bind mount)",
          example: "docker run -v /home/user/data:/app/data nginx"
        },
        {
          command: "docker run -v volume_name:/container/path <image>",
          description: "Mount named volume to container",
          example: "docker run -v my-data:/app/data nginx"
        },
        {
          command: "docker run -v /container/path <image>",
          description: "Create anonymous volume for container path",
          example: "docker run -v /app/data nginx"
        },
        {
          command: "docker volume inspect <volume>",
          description: "Display detailed information about a volume",
          example: "docker volume inspect my-data"
        },
        {
          command: "docker volume rm <volume>",
          description: "Remove a volume (must not be in use)",
          example: "docker volume rm my-data"
        },
        {
          command: "docker volume prune",
          description: "Remove all unused volumes",
          example: "Cleans up dangling volumes to free disk space"
        }
      ]
    },
    {
      title: "Selenium Grid with Docker",
      icon: <TestTube className="w-6 h-6" />,
      color: "text-orange-600",
      commands: [
        {
          command: "docker run -d -p 4444:4444 -p 7900:7900 --shm-size=2g selenium/standalone-chrome",
          description: "Run standalone Chrome browser with VNC access",
          example: "Access at http://localhost:4444 (Grid) and http://localhost:7900 (VNC)"
        },
        {
          command: "docker run -d -p 4444:4444 -p 7900:7900 --shm-size=2g selenium/standalone-firefox",
          description: "Run standalone Firefox browser with VNC access",
          example: "VNC password: secret"
        },
        {
          command: "docker run -d -p 4444:4444 -p 7900:7900 --shm-size=2g selenium/standalone-edge",
          description: "Run standalone Edge browser with VNC access",
          example: "Latest Microsoft Edge browser for testing"
        },
        {
          command: "docker run -d -p 4442-4444:4442-4444 --name selenium-hub selenium/hub",
          description: "Start Selenium Grid Hub for distributed testing",
          example: "Hub coordinates multiple browser nodes"
        },
        {
          command: "docker run -d --link selenium-hub:hub selenium/node-chrome",
          description: "Add Chrome node to existing Grid Hub",
          example: "Connects automatically to linked hub"
        },
        {
          command: "docker run -d --link selenium-hub:hub selenium/node-firefox",
          description: "Add Firefox node to existing Grid Hub",
          example: "Scales testing across multiple browsers"
        },
        {
          command: "docker run -d -e HUB_HOST=hub-ip selenium/node-chrome",
          description: "Connect Chrome node to remote Hub",
          example: "For distributed setups across multiple machines"
        },
        {
          command: "docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome",
          description: "Run Chrome with shared memory for better performance",
          example: "Prevents browser crashes in resource-intensive tests"
        },
        {
          command: "docker run -d -p 4444:4444 -v /home/user/downloads:/home/seluser/Downloads selenium/standalone-chrome",
          description: "Map download directory for file download tests",
          example: "Downloaded files appear in host directory"
        },
        {
          command: "docker network create selenium-grid",
          description: "Create dedicated network for Selenium Grid",
          example: "Isolates grid traffic from other containers"
        },
        {
          command: "docker run -d --network selenium-grid --name hub selenium/hub",
          description: "Run Hub on custom network",
          example: "Better network isolation and management"
        },
        {
          command: "docker run -d --network selenium-grid -e HUB_HOST=hub selenium/node-chrome",
          description: "Connect Chrome node via custom network",
          example: "Uses container name for hub discovery"
        },
        {
          command: "docker run -d -e SE_OPTS='--log-level INFO' selenium/standalone-chrome",
          description: "Set logging level for debugging",
          example: "Available levels: SEVERE, WARNING, INFO, CONFIG, FINE"
        },
        {
          command: "docker run -d -e SE_NODE_MAX_INSTANCES=3 selenium/node-chrome",
          description: "Set maximum concurrent browser instances per node",
          example: "Balances performance vs resource usage"
        }
      ]
    }
  ];

  const volumeExamples = [
    {
      title: "Database Data Persistence",
      description: "Keep MySQL data between container restarts",
      command: "docker run -d --name mysql-db -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret mysql:8.0",
      explanation: "Creates named volume 'mysql-data' to persist database files"
    },
    {
      title: "Development Code Sync",
      description: "Live reload during development",
      command: "docker run -d -p 3000:3000 -v $(pwd):/app -v /app/node_modules node-app",
      explanation: "Bind mounts current directory while preserving node_modules in container"
    },
    {
      title: "Log File Collection",
      description: "Centralized logging for production apps",
      command: "docker run -d -v /var/log/myapp:/app/logs --name web-server nginx",
      explanation: "Maps container logs to host directory for monitoring tools"
    },
    {
      title: "Configuration Management",
      description: "External config files without rebuilding images",
      command: "docker run -d -v /host/config:/app/config:ro --name api-server my-api",
      explanation: "Read-only mount of configuration directory"
    },
    {
      title: "Backup and Restore",
      description: "Database backup workflow",
      command: "docker run --rm -v mysql-data:/data -v $(pwd):/backup alpine tar czf /backup/db-backup.tar.gz /data",
      explanation: "Creates compressed backup of volume data to host directory"
    },
    {
      title: "Shared Storage",
      description: "Multiple containers sharing data",
      command: "docker run -d -v shared-storage:/data --name app1 my-app && docker run -d -v shared-storage:/data --name app2 my-app",
      explanation: "Both containers access same named volume for data sharing"
    }
  ];

  const dockerComposeExample = `version: '3.8'
services:
  selenium-hub:
    image: selenium/hub:latest
    container_name: selenium-hub
    ports:
      - "4442:4442"
      - "4443:4443"
      - "4444:4444"
    networks:
      - selenium-grid

  chrome-node-1:
    image: selenium/node-chrome:latest
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - HUB_HOST=selenium-hub
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    networks:
      - selenium-grid
    ports:
      - "7901:7900"

  chrome-node-2:
    image: selenium/node-chrome:latest
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - HUB_HOST=selenium-hub
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    networks:
      - selenium-grid
    ports:
      - "7902:7900"

  chrome-node-3:
    image: selenium/node-chrome:latest
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - HUB_HOST=selenium-hub
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    networks:
      - selenium-grid
    ports:
      - "7903:7900"

  firefox-node-1:
    image: selenium/node-firefox:latest
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - HUB_HOST=selenium-hub
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    networks:
      - selenium-grid
    ports:
      - "7904:7900"

  firefox-node-2:
    image: selenium/node-firefox:latest
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - HUB_HOST=selenium-hub
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    networks:
      - selenium-grid
    ports:
      - "7905:7900"

  edge-node:
    image: selenium/node-edge:latest
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - HUB_HOST=selenium-hub
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
    networks:
      - selenium-grid
    ports:
      - "7906:7900"

networks:
  selenium-grid:
    driver: bridge`;

  const [copiedCompose, setCopiedCompose] = useState(false);

  const copyComposeToClipboard = () => {
    navigator.clipboard.writeText(dockerComposeExample);
    setCopiedCompose(true);
    setTimeout(() => setCopiedCompose(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent opacity-20"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center justify-center mb-8">
            <div className="p-4 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30">
              <Container className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Docker Mastery Guide
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            From dual-boot frustrations to seamless containerization. Master Docker with comprehensive commands, 
            real-world examples, and professional best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Terminal className="w-5 h-5" />
              <span>Essential Commands</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Database className="w-5 h-5" />
              <span>Volume Management</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <TestTube className="w-5 h-5" />
              <span>Selenium Grid</span>
            </div>
          </div>
        </div>
      </section>

      {/* Command Sections */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {commandSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className={`p-3 rounded-lg bg-white shadow-md border-2 ${section.color.replace('text-', 'border-')}`}>
                {section.icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.commands.map((command, index) => (
                <CommandCard key={index} command={command} color={section.color} />
              ))}
            </div>
          </section>
        ))}

        {/* Volume Examples Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-lg bg-white shadow-md border-2 border-green-600">
              <HardDrive className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Real-World Volume Examples</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {volumeExamples.map((example, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{example.title}</h3>
                <p className="text-gray-600 mb-4">{example.description}</p>
                <div className="bg-gray-50 rounded p-4 mb-3">
                  <code className="text-sm text-gray-800 break-all">{example.command}</code>
                </div>
                <p className="text-sm text-gray-600 italic">{example.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Docker Compose Example */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-lg bg-white shadow-md border-2 border-orange-600">
              <TestTube className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Complete Selenium Grid Setup</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">docker-compose.yml</h3>
              <button
                onClick={copyComposeToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                {copiedCompose ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedCompose ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{dockerComposeExample}</code>
              </pre>
            </div>
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Quick Start:</h4>
              <div className="space-y-2 text-sm text-orange-700">
                <p><code className="bg-orange-100 px-2 py-1 rounded">docker-compose up -d</code> - Start the entire grid</p>
                <p><code className="bg-orange-100 px-2 py-1 rounded">docker-compose scale chrome-node=5</code> - Scale Chrome nodes</p>
                <p><strong>Grid Console:</strong> http://localhost:4444</p>
                <p><strong>VNC Access:</strong> http://localhost:7901-7906 (password: secret)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-12 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Container className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">Docker Mastery Guide</span>
          </div>
          <p className="text-gray-600 mb-4">
            From containerization basics to advanced Selenium Grid deployments
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <span>✨ Production-Ready Examples</span>
            <span>🚀 Copy-Paste Commands</span>
            <span>📚 Official Documentation</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;