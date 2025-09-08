import React, { useState } from 'react';
import { Container, Copy, CheckCircle, Terminal, Database, Globe, Settings, Play, Pause, Trash2, Download, Search, Network, HardDrive, TestTube, BookOpen, Zap, Star, Award, Lightbulb, Code, Rocket } from 'lucide-react';

interface Command {
  command: string;
  description: string;
  example?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface CommandSection {
  title: string;
  icon: React.ReactNode;
  commands: Command[];
  color: string;
  bgGradient: string;
  description: string;
}

const CommandCard: React.FC<{ command: Command; color: string }> = ({ command, color }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:border-blue-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {command.difficulty && (
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mb-3 ${getDifficultyColor(command.difficulty)}`}>
              {command.difficulty}
            </span>
          )}
          <code className={`block text-sm font-mono ${color} bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-lg border-l-4 ${color.replace('text-', 'border-')} break-all`}>
            {command.command}
          </code>
        </div>
        <button
          onClick={() => copyToClipboard(command.command)}
          className="ml-3 p-3 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all duration-200 group-hover:scale-110"
          title="Copy command"
        >
          {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
      <p className="text-gray-700 mb-4 leading-relaxed">{command.description}</p>
      {command.example && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-indigo-500" />
            <p className="text-sm font-medium text-indigo-700">Example:</p>
          </div>
          <code className="text-sm text-gray-800 block leading-relaxed">{command.example}</code>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const commandSections: CommandSection[] = [
    {
      title: "Essential Docker Commands",
      description: "Master the fundamental Docker commands every developer needs to know",
      icon: <Container className="w-6 h-6" />,
      color: "text-blue-600",
      bgGradient: "from-blue-500 to-cyan-500",
      commands: [
        {
          command: "docker --version",
          description: "Check Docker version and verify installation",
          example: "Docker version 24.0.6, build ed223bc",
          difficulty: "beginner"
        },
        {
          command: "docker pull <image>",
          description: "Download an image from Docker Hub",
          example: "docker pull nginx:latest",
          difficulty: "beginner"
        },
        {
          command: "docker images",
          description: "List all downloaded images on your system",
          example: "Shows repository, tag, image ID, created date, and size",
          difficulty: "beginner"
        },
        {
          command: "docker run <image>",
          description: "Create and start a new container from an image",
          example: "docker run -d -p 80:80 nginx",
          difficulty: "beginner"
        },
        {
          command: "docker ps",
          description: "List all currently running containers",
          example: "Shows container ID, image, command, status, ports, and names",
          difficulty: "beginner"
        },
        {
          command: "docker ps -a",
          description: "List all containers (running and stopped)",
          example: "Includes exited containers with their exit codes",
          difficulty: "beginner"
        },
        {
          command: "docker stop <container>",
          description: "Gracefully stop a running container",
          example: "docker stop my-nginx-container",
          difficulty: "beginner"
        },
        {
          command: "docker start <container>",
          description: "Start a stopped container",
          example: "docker start my-nginx-container",
          difficulty: "beginner"
        },
        {
          command: "docker restart <container>",
          description: "Restart a running container",
          example: "docker restart my-nginx-container",
          difficulty: "intermediate"
        },
        {
          command: "docker rm <container>",
          description: "Remove a stopped container permanently",
          example: "docker rm my-nginx-container",
          difficulty: "beginner"
        },
        {
          command: "docker rmi <image>",
          description: "Remove an image from your system",
          example: "docker rmi nginx:latest",
          difficulty: "beginner"
        },
        {
          command: "docker build -t <name> .",
          description: "Build an image from a Dockerfile in current directory",
          example: "docker build -t my-app:v1.0 .",
          difficulty: "intermediate"
        }
      ]
    },
    {
      title: "Advanced Docker Operations",
      description: "Level up your Docker skills with advanced container management techniques",
      icon: <Settings className="w-6 h-6" />,
      color: "text-purple-600",
      bgGradient: "from-purple-500 to-pink-500",
      commands: [
        {
          command: "docker exec -it <container> /bin/bash",
          description: "Access running container with interactive terminal",
          example: "docker exec -it my-app /bin/bash",
          difficulty: "intermediate"
        },
        {
          command: "docker logs <container>",
          description: "View container logs and output",
          example: "docker logs -f my-app (follow logs in real-time)",
          difficulty: "intermediate"
        },
        {
          command: "docker inspect <container>",
          description: "Get detailed information about container configuration",
          example: "docker inspect my-app | grep IPAddress",
          difficulty: "advanced"
        },
        {
          command: "docker cp <src> <container>:<dest>",
          description: "Copy files between host and container",
          example: "docker cp ./config.json my-app:/app/config.json",
          difficulty: "intermediate"
        },
        {
          command: "docker stats",
          description: "Display real-time resource usage statistics",
          example: "Shows CPU, memory, network I/O, and disk I/O usage",
          difficulty: "intermediate"
        },
        {
          command: "docker top <container>",
          description: "Display running processes inside a container",
          example: "docker top my-app",
          difficulty: "intermediate"
        },
        {
          command: "docker diff <container>",
          description: "Show changes made to container's filesystem",
          example: "docker diff my-app",
          difficulty: "advanced"
        },
        {
          command: "docker network ls",
          description: "List all Docker networks",
          example: "Shows bridge, host, and custom networks",
          difficulty: "intermediate"
        },
        {
          command: "docker network create <name>",
          description: "Create a custom Docker network",
          example: "docker network create my-network",
          difficulty: "intermediate"
        },
        {
          command: "docker port <container>",
          description: "Show port mappings for a container",
          example: "docker port my-nginx",
          difficulty: "intermediate"
        },
        {
          command: "docker volume ls",
          description: "List all Docker volumes",
          example: "Shows volume names and drivers",
          difficulty: "intermediate"
        },
        {
          command: "docker volume create <name>",
          description: "Create a named volume for persistent data",
          example: "docker volume create my-data",
          difficulty: "intermediate"
        },
        {
          command: "docker commit <container> <image>",
          description: "Create a new image from container changes",
          example: "docker commit my-app my-app:v2.0",
          difficulty: "advanced"
        },
        {
          command: "docker save -o <file> <image>",
          description: "Export image to a tar archive",
          example: "docker save -o my-app.tar my-app:latest",
          difficulty: "advanced"
        },
        {
          command: "docker load -i <file>",
          description: "Import image from a tar archive",
          example: "docker load -i my-app.tar",
          difficulty: "advanced"
        },
        {
          command: "docker history <image>",
          description: "Show the history and layers of an image",
          example: "docker history nginx:latest",
          difficulty: "intermediate"
        },
        {
          command: "docker search <term>",
          description: "Search for images on Docker Hub",
          example: "docker search nginx",
          difficulty: "beginner"
        }
      ]
    },
    {
      title: "Docker Volume Management",
      description: "Master data persistence and sharing between containers",
      icon: <HardDrive className="w-6 h-6" />,
      color: "text-green-600",
      bgGradient: "from-green-500 to-emerald-500",
      commands: [
        {
          command: "docker run -v /host/path:/container/path <image>",
          description: "Mount host directory to container (bind mount)",
          example: "docker run -v /home/user/data:/app/data nginx",
          difficulty: "intermediate"
        },
        {
          command: "docker run -v volume_name:/container/path <image>",
          description: "Mount named volume to container",
          example: "docker run -v my-data:/app/data nginx",
          difficulty: "intermediate"
        },
        {
          command: "docker run -v /container/path <image>",
          description: "Create anonymous volume for container path",
          example: "docker run -v /app/data nginx",
          difficulty: "intermediate"
        },
        {
          command: "docker volume inspect <volume>",
          description: "Display detailed information about a volume",
          example: "docker volume inspect my-data",
          difficulty: "intermediate"
        },
        {
          command: "docker volume rm <volume>",
          description: "Remove a volume (must not be in use)",
          example: "docker volume rm my-data",
          difficulty: "intermediate"
        },
        {
          command: "docker volume prune",
          description: "Remove all unused volumes",
          example: "Cleans up dangling volumes to free disk space",
          difficulty: "intermediate"
        },
        {
          command: "docker run --mount type=bind,source=/host,target=/container <image>",
          description: "Modern syntax for bind mounts with explicit options",
          example: "docker run --mount type=bind,source=/home/data,target=/app/data nginx",
          difficulty: "advanced"
        },
        {
          command: "docker run --mount type=volume,source=vol-name,target=/data <image>",
          description: "Modern syntax for named volume mounts",
          example: "docker run --mount type=volume,source=my-vol,target=/app/data nginx",
          difficulty: "advanced"
        },
        {
          command: "docker run -v /data --name data-container alpine",
          description: "Create a data-only container for sharing volumes",
          example: "docker run --volumes-from data-container my-app",
          difficulty: "advanced"
        },
        {
          command: "docker run -v /host:/container:ro <image>",
          description: "Mount volume as read-only",
          example: "docker run -v /etc/config:/app/config:ro nginx",
          difficulty: "intermediate"
        }
      ]
    },
    {
      title: "Selenium Grid with Docker",
      description: "Set up scalable browser testing infrastructure with Selenium Grid",
      icon: <TestTube className="w-6 h-6" />,
      color: "text-orange-600",
      bgGradient: "from-orange-500 to-red-500",
      commands: [
        {
          command: "docker run -d -p 4444:4444 -p 7900:7900 --shm-size=2g selenium/standalone-chrome",
          description: "Run standalone Chrome browser with VNC access",
          example: "Access at http://localhost:4444 (Grid) and http://localhost:7900 (VNC)",
          difficulty: "intermediate"
        },
        {
          command: "docker run -d -p 4444:4444 -p 7900:7900 --shm-size=2g selenium/standalone-firefox",
          description: "Run standalone Firefox browser with VNC access",
          example: "VNC password: secret",
          difficulty: "intermediate"
        },
        {
          command: "docker run -d -p 4444:4444 -p 7900:7900 --shm-size=2g selenium/standalone-edge",
          description: "Run standalone Edge browser with VNC access",
          example: "Latest Microsoft Edge browser for testing",
          difficulty: "intermediate"
        },
        {
          command: "docker run -d -p 4442-4444:4442-4444 --name selenium-hub selenium/hub",
          description: "Start Selenium Grid Hub for distributed testing",
          example: "Hub coordinates multiple browser nodes",
          difficulty: "advanced"
        },
        {
          command: "docker run -d --link selenium-hub:hub selenium/node-chrome",
          description: "Add Chrome node to existing Grid Hub",
          example: "Connects automatically to linked hub",
          difficulty: "advanced"
        },
        {
          command: "docker run -d --link selenium-hub:hub selenium/node-firefox",
          description: "Add Firefox node to existing Grid Hub",
          example: "Scales testing across multiple browsers",
          difficulty: "advanced"
        },
        {
          command: "docker run -d -e HUB_HOST=hub-ip selenium/node-chrome",
          description: "Connect Chrome node to remote Hub",
          example: "For distributed setups across multiple machines",
          difficulty: "advanced"
        },
        {
          command: "docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome",
          description: "Run Chrome with shared memory for better performance",
          example: "Prevents browser crashes in resource-intensive tests",
          difficulty: "advanced"
        },
        {
          command: "docker run -d -p 4444:4444 -v /home/user/downloads:/home/seluser/Downloads selenium/standalone-chrome",
          description: "Map download directory for file download tests",
          example: "Downloaded files appear in host directory",
          difficulty: "intermediate"
        },
        {
          command: "docker network create selenium-grid",
          description: "Create dedicated network for Selenium Grid",
          example: "Isolates grid traffic from other containers",
          difficulty: "intermediate"
        },
        {
          command: "docker run -d --network selenium-grid --name hub selenium/hub",
          description: "Run Hub on custom network",
          example: "Better network isolation and management",
          difficulty: "advanced"
        },
        {
          command: "docker run -d --network selenium-grid -e HUB_HOST=hub selenium/node-chrome",
          description: "Connect Chrome node via custom network",
          example: "Uses container name for hub discovery",
          difficulty: "advanced"
        },
        {
          command: "docker run -d -e SE_OPTS='--log-level INFO' selenium/standalone-chrome",
          description: "Set logging level for debugging",
          example: "Available levels: SEVERE, WARNING, INFO, CONFIG, FINE",
          difficulty: "intermediate"
        },
        {
          command: "docker run -d -e SE_NODE_MAX_INSTANCES=3 selenium/node-chrome",
          description: "Set maximum concurrent browser instances per node",
          example: "Balances performance vs resource usage",
          difficulty: "advanced"
        }
      ]
    }
  ];

  const volumeExamples = [
    {
      title: "Database Data Persistence",
      description: "Keep MySQL data between container restarts",
      command: "docker run -d --name mysql-db -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=secret mysql:8.0",
      explanation: "Creates named volume 'mysql-data' to persist database files",
      icon: <Database className="w-6 h-6 text-blue-500" />,
      difficulty: "intermediate"
    },
    {
      title: "Development Code Sync",
      description: "Live reload during development",
      command: "docker run -d -p 3000:3000 -v $(pwd):/app -v /app/node_modules node-app",
      explanation: "Bind mounts current directory while preserving node_modules in container",
      icon: <Code className="w-6 h-6 text-green-500" />,
      difficulty: "intermediate"
    },
    {
      title: "Log File Collection",
      description: "Centralized logging for production apps",
      command: "docker run -d -v /var/log/myapp:/app/logs --name web-server nginx",
      explanation: "Maps container logs to host directory for monitoring tools",
      icon: <Terminal className="w-6 h-6 text-purple-500" />,
      difficulty: "intermediate"
    },
    {
      title: "Configuration Management",
      description: "External config files without rebuilding images",
      command: "docker run -d -v /host/config:/app/config:ro --name api-server my-api",
      explanation: "Read-only mount of configuration directory",
      icon: <Settings className="w-6 h-6 text-orange-500" />,
      difficulty: "intermediate"
    },
    {
      title: "Backup and Restore",
      description: "Database backup workflow",
      command: "docker run --rm -v mysql-data:/data -v $(pwd):/backup alpine tar czf /backup/db-backup.tar.gz /data",
      explanation: "Creates compressed backup of volume data to host directory",
      icon: <Download className="w-6 h-6 text-red-500" />,
      difficulty: "advanced"
    },
    {
      title: "Shared Storage",
      description: "Multiple containers sharing data",
      command: "docker run -d -v shared-storage:/data --name app1 my-app && docker run -d -v shared-storage:/data --name app2 my-app",
      explanation: "Both containers access same named volume for data sharing",
      icon: <Network className="w-6 h-6 text-indigo-500" />,
      difficulty: "advanced"
    },
    {
      title: "Static Website Hosting",
      description: "Serve static files from host directory",
      command: "docker run -d -p 80:80 -v /home/user/website:/usr/share/nginx/html:ro nginx",
      explanation: "Read-only mount of website files for production serving",
      icon: <Globe className="w-6 h-6 text-cyan-500" />,
      difficulty: "beginner"
    },
    {
      title: "Development Database",
      description: "PostgreSQL with persistent data and initialization scripts",
      command: "docker run -d -p 5432:5432 -v pgdata:/var/lib/postgresql/data -v ./init:/docker-entrypoint-initdb.d:ro -e POSTGRES_PASSWORD=dev postgres",
      explanation: "Combines data persistence with initialization script mounting",
      icon: <Database className="w-6 h-6 text-blue-600" />,
      difficulty: "intermediate"
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
    environment:
      - GRID_MAX_SESSION=16
      - GRID_BROWSER_TIMEOUT=300
      - GRID_TIMEOUT=300

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
      - SE_NODE_MAX_INSTANCES=2
      - SE_NODE_MAX_SESSIONS=2
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
      - SE_NODE_MAX_INSTANCES=2
      - SE_NODE_MAX_SESSIONS=2
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
      - SE_NODE_MAX_INSTANCES=2
      - SE_NODE_MAX_SESSIONS=2
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
      - SE_NODE_MAX_INSTANCES=2
      - SE_NODE_MAX_SESSIONS=2
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
      - SE_NODE_MAX_INSTANCES=2
      - SE_NODE_MAX_SESSIONS=2
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
      - SE_NODE_MAX_INSTANCES=2
      - SE_NODE_MAX_SESSIONS=2
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

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-yellow-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
              <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <Container className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
              Docker Mastery
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <span className="text-2xl font-semibold text-gray-700">Learn • Practice • Master</span>
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Transform from containerization beginner to Docker expert with our comprehensive, 
            hands-on learning guide featuring real-world examples and best practices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Learn Fundamentals</h3>
              <p className="text-gray-600 text-sm">Master essential Docker commands with clear explanations</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Practice Examples</h3>
              <p className="text-gray-600 text-sm">Real-world scenarios with copy-paste commands</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Achieve Mastery</h3>
              <p className="text-gray-600 text-sm">Advanced techniques for production environments</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Beginner Friendly</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full border border-yellow-200">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-medium">Intermediate Concepts</span>
            </div>
            <div className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full border border-red-200">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-medium">Advanced Techniques</span>
            </div>
          </div>
        </div>
      </section>

      {/* Command Sections */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {commandSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center mb-6">
                <div className={`p-4 bg-gradient-to-r ${section.bgGradient} rounded-2xl shadow-lg`}>
                  <div className="text-white">
                    {section.icon}
                  </div>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{section.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {section.commands.map((command, index) => (
                <CommandCard key={index} command={command} color={section.color} />
              ))}
            </div>
          </section>
        ))}

        {/* Volume Examples Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                <HardDrive className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Real-World Volume Examples</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Practical scenarios showing how to use Docker volumes for data persistence, development workflows, and production deployments
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {volumeExamples.map((example, index) => (
              <div key={index} className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    {example.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{example.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        example.difficulty === 'beginner' ? 'bg-green-100 text-green-800 border border-green-200' :
                        example.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                        'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {example.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{example.description}</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4 border-l-4 border-green-500">
                  <code className="text-sm text-gray-800 break-all leading-relaxed">{example.command}</code>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-600 italic leading-relaxed">{example.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Docker Compose Example */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
                <TestTube className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Production Selenium Grid Setup</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Complete Docker Compose configuration for scalable browser testing infrastructure
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">docker-compose.yml</h3>
                </div>
                <button
                  onClick={copyComposeToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
                >
                  {copiedCompose ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedCompose ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            
            <div className="bg-gray-900 p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm leading-relaxed">
                <code>{dockerComposeExample}</code>
              </pre>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-t border-orange-100">
              <h4 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Quick Start Commands:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <code className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-mono">docker-compose up -d</code>
                    <span className="text-orange-700">Start the grid</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <code className="bg-orange-100 text-orange-800 px-3 py-1 rounded-lg font-mono">docker-compose scale chrome-node-1=3</code>
                    <span className="text-orange-700">Scale nodes</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-orange-600" />
                    <strong className="text-orange-800">Grid Console:</strong>
                    <span className="text-orange-700">http://localhost:4444</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-orange-600" />
                    <strong className="text-orange-800">VNC Access:</strong>
                    <span className="text-orange-700">localhost:7901-7906 (password: secret)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-16 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Container className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Docker Mastery Guide
            </span>
          </div>
          <p className="text-gray-600 mb-6 text-lg">
            From containerization basics to advanced production deployments
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>Production-Ready Examples</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Copy-Paste Commands</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="w-4 h-4 text-green-500" />
              <span>Official Documentation</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="w-4 h-4 text-purple-500" />
              <span>Expert-Level Content</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;