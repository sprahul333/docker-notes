import React, { useState } from 'react';
import { Container, Copy, CheckCircle, Terminal, Database, Globe, Settings, Play, Pause, Trash2, Download, Search, Network, HardDrive, TestTube, BookOpen, Zap, Star, Award, Lightbulb, Code, Rocket, RefreshCw, Package, Info, Layers, Monitor, Activity } from 'lucide-react';

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
    <div className="group bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-xl hover:border-blue-300 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {command.difficulty && (
            <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold mb-2.5 ${getDifficultyColor(command.difficulty)}`}>
              {command.difficulty.toUpperCase()}
            </span>
          )}
          <code className={`block text-sm font-mono ${color} bg-gray-50 px-3.5 py-2.5 rounded-md border border-gray-200 break-all font-medium`}>
            {command.command}
          </code>
        </div>
        <button
          onClick={() => copyToClipboard(command.command)}
          className="ml-3 p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-150 border border-transparent hover:border-blue-200"
          title="Copy command"
        >
          {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-gray-600 text-sm mb-3 leading-relaxed">{command.description}</p>
      {command.example && (
        <div className="bg-blue-50 rounded-md p-3.5 border border-blue-200">
          <div className="flex items-center gap-2 mb-1.5">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-semibold text-blue-900">EXAMPLE</p>
          </div>
          <code className="text-xs text-gray-700 block leading-relaxed font-mono">{command.example}</code>
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
        },
        {
          command: "docker tag <source> <target>",
          description: "Create a tag for an image (useful for versioning)",
          example: "docker tag my-app:latest my-app:v1.0.0",
          difficulty: "intermediate"
        },
        {
          command: "docker push <image>",
          description: "Upload an image to a container registry",
          example: "docker push myuser/my-app:latest",
          difficulty: "intermediate"
        },
        {
          command: "docker login",
          description: "Authenticate to a Docker registry",
          example: "docker login -u myusername",
          difficulty: "beginner"
        },
        {
          command: "docker logs -f <container>",
          description: "Follow log output in real-time",
          example: "docker logs -f --tail 100 my-app",
          difficulty: "beginner"
        },
        {
          command: "docker kill <container>",
          description: "Force stop a running container immediately",
          example: "docker kill my-nginx-container",
          difficulty: "beginner"
        }
      ]
    },
    {
      title: "Advanced Docker Operations",
      description: "Level up your Docker skills with advanced container management techniques",
      icon: <Settings className="w-6 h-6" />,
      color: "text-slate-700",
      bgGradient: "from-slate-600 to-gray-700",
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
        },
        {
          command: "docker attach <container>",
          description: "Attach to a running container's console",
          example: "docker attach my-app (Ctrl+P, Ctrl+Q to detach)",
          difficulty: "intermediate"
        },
        {
          command: "docker wait <container>",
          description: "Block until container stops, then print exit code",
          example: "docker wait my-batch-job",
          difficulty: "intermediate"
        },
        {
          command: "docker pause <container>",
          description: "Pause all processes in a container",
          example: "docker pause my-app",
          difficulty: "intermediate"
        },
        {
          command: "docker unpause <container>",
          description: "Resume all processes in a paused container",
          example: "docker unpause my-app",
          difficulty: "intermediate"
        },
        {
          command: "docker rename <old> <new>",
          description: "Rename a container",
          example: "docker rename old-name new-name",
          difficulty: "beginner"
        },
        {
          command: "docker update --memory 512m <container>",
          description: "Update container resource limits",
          example: "docker update --cpus 2 --memory 1g my-app",
          difficulty: "advanced"
        },
        {
          command: "docker events",
          description: "Stream real-time Docker daemon events",
          example: "docker events --filter 'type=container'",
          difficulty: "intermediate"
        }
      ]
    },
    {
      title: "Docker System & Cleanup",
      description: "Manage disk space and system resources efficiently",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "text-red-600",
      bgGradient: "from-red-500 to-orange-500",
      commands: [
        {
          command: "docker system df",
          description: "Show Docker disk usage",
          example: "Shows space used by images, containers, volumes, and build cache",
          difficulty: "beginner"
        },
        {
          command: "docker system prune",
          description: "Remove all unused data (containers, networks, images)",
          example: "docker system prune -a (includes unused images)",
          difficulty: "intermediate"
        },
        {
          command: "docker system prune -a --volumes",
          description: "Remove all unused data including volumes",
          example: "WARNING: This will delete all stopped containers, unused volumes, networks, and images",
          difficulty: "advanced"
        },
        {
          command: "docker system info",
          description: "Display system-wide information",
          example: "Shows Docker version, number of containers, images, and system configuration",
          difficulty: "beginner"
        },
        {
          command: "docker container prune",
          description: "Remove all stopped containers",
          example: "docker container prune -f (skip confirmation)",
          difficulty: "intermediate"
        },
        {
          command: "docker image prune",
          description: "Remove unused images",
          example: "docker image prune -a (remove all unused images)",
          difficulty: "intermediate"
        },
        {
          command: "docker network prune",
          description: "Remove all unused networks",
          example: "docker network prune -f",
          difficulty: "intermediate"
        },
        {
          command: "docker volume prune",
          description: "Remove all unused local volumes",
          example: "WARNING: This permanently deletes volume data",
          difficulty: "intermediate"
        },
        {
          command: "docker rm $(docker ps -aq)",
          description: "Remove all containers (stopped and running)",
          example: "docker stop $(docker ps -q) && docker rm $(docker ps -aq)",
          difficulty: "advanced"
        },
        {
          command: "docker rmi $(docker images -q)",
          description: "Remove all images from your system",
          example: "Use with caution - removes ALL images",
          difficulty: "advanced"
        },
        {
          command: "docker builder prune",
          description: "Remove build cache",
          example: "docker builder prune -a (remove all build cache)",
          difficulty: "intermediate"
        }
      ]
    },
    {
      title: "Docker Networking",
      description: "Configure and manage container networking for complex applications",
      icon: <Network className="w-6 h-6" />,
      color: "text-cyan-600",
      bgGradient: "from-cyan-500 to-blue-500",
      commands: [
        {
          command: "docker network create <name>",
          description: "Create a user-defined bridge network",
          example: "docker network create --driver bridge my-network",
          difficulty: "intermediate"
        },
        {
          command: "docker network ls",
          description: "List all networks",
          example: "Shows bridge, host, none, and custom networks",
          difficulty: "beginner"
        },
        {
          command: "docker network inspect <network>",
          description: "View detailed network configuration",
          example: "docker network inspect bridge",
          difficulty: "intermediate"
        },
        {
          command: "docker network connect <network> <container>",
          description: "Connect container to a network",
          example: "docker network connect my-network my-app",
          difficulty: "intermediate"
        },
        {
          command: "docker network disconnect <network> <container>",
          description: "Disconnect container from a network",
          example: "docker network disconnect my-network my-app",
          difficulty: "intermediate"
        },
        {
          command: "docker network rm <network>",
          description: "Remove a network",
          example: "docker network rm my-network",
          difficulty: "beginner"
        },
        {
          command: "docker run --network <network> <image>",
          description: "Start container on specific network",
          example: "docker run --network my-network --name web nginx",
          difficulty: "intermediate"
        },
        {
          command: "docker run --network host <image>",
          description: "Use host network stack (no isolation)",
          example: "docker run --network host nginx",
          difficulty: "advanced"
        },
        {
          command: "docker network create --subnet 172.20.0.0/16 <name>",
          description: "Create network with custom subnet",
          example: "docker network create --subnet 10.0.0.0/24 --gateway 10.0.0.1 custom-net",
          difficulty: "advanced"
        },
        {
          command: "docker run --link <container>:<alias> <image>",
          description: "Link containers (legacy, use networks instead)",
          example: "docker run --link database:db web-app",
          difficulty: "intermediate"
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
    },
    {
      title: "Redis Cache with Persistence",
      description: "Redis with data persistence for session storage",
      command: "docker run -d -p 6379:6379 -v redis-data:/data --name redis redis redis-server --appendonly yes",
      explanation: "Enables Redis append-only file (AOF) persistence to prevent data loss",
      icon: <Activity className="w-6 h-6 text-red-500" />,
      difficulty: "intermediate"
    },
    {
      title: "Jenkins CI/CD Server",
      description: "Jenkins with persistent jobs and configurations",
      command: "docker run -d -p 8080:8080 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins/jenkins:lts",
      explanation: "Persists Jenkins data and allows Docker commands inside Jenkins",
      icon: <Rocket className="w-6 h-6 text-blue-500" />,
      difficulty: "advanced"
    },
    {
      title: "SSL Certificate Storage",
      description: "Nginx with SSL certificates from host",
      command: "docker run -d -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt:ro -v ./nginx.conf:/etc/nginx/nginx.conf:ro nginx",
      explanation: "Read-only mount of SSL certificates for secure HTTPS serving",
      icon: <Globe className="w-6 h-6 text-green-500" />,
      difficulty: "advanced"
    },
    {
      title: "MongoDB with Backup",
      description: "MongoDB with automated backup capability",
      command: "docker run -d -p 27017:27017 -v mongo-data:/data/db -v ./backup:/backup --name mongodb mongo",
      explanation: "Separate volumes for data and backups enable easy data management",
      icon: <Database className="w-6 h-6 text-green-600" />,
      difficulty: "intermediate"
    },
    {
      title: "Development with Hot Reload",
      description: "React app with live code synchronization",
      command: "docker run -d -p 3000:3000 -v $(pwd)/src:/app/src -v /app/node_modules -e CHOKIDAR_USEPOLLING=true react-app",
      explanation: "Enables hot module replacement while preserving node_modules in container",
      icon: <Code className="w-6 h-6 text-cyan-500" />,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>

        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-2xl"></div>
              <div className="relative">
                <img
                  src="/testing_professor.png"
                  alt="Testing Professor Logo"
                  className="w-32 h-32 rounded-full border-4 border-white/40 shadow-2xl"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3 leading-tight tracking-tight">
              Testing Professor
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-white/40"></div>
              <span className="text-xl font-medium text-white/90">Docker Command Reference</span>
              <div className="h-px w-12 bg-white/40"></div>
            </div>
          </div>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Complete guide to Docker commands with practical examples for containerization,
            testing infrastructure, and production deployments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2.5 bg-green-500 rounded-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1.5">Fundamentals</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Essential commands</p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2.5 bg-blue-500 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1.5">Examples</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Real-world scenarios</p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2.5 bg-orange-500 rounded-lg">
                  <TestTube className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1.5">Testing</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Selenium Grid setup</p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2.5 bg-cyan-500 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1.5">Production</h3>
              <p className="text-gray-600 text-xs leading-relaxed">Advanced techniques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Command Sections */}
      <div className="max-w-7xl mx-auto px-4 pb-16 pt-12">
        {commandSections.map((section, sectionIndex) => (
          <section key={sectionIndex} className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center mb-5">
                <div className={`p-3.5 bg-gradient-to-r ${section.bgGradient} rounded-xl shadow-md`}>
                  <div className="text-white">
                    {section.icon}
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">{section.description}</p>
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
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-5">
              <div className="p-3.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-md">
                <HardDrive className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Real-World Volume Examples</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Practical scenarios for data persistence, development workflows, and production deployments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {volumeExamples.map((example, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-green-300 transition-all duration-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 mt-1">
                    {example.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{example.title}</h3>
                      <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                        example.difficulty === 'beginner' ? 'bg-green-100 text-green-800 border border-green-200' :
                        example.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                        'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {example.difficulty?.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{example.description}</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md p-3.5 mb-3 border border-gray-200">
                  <code className="text-xs text-gray-800 break-all leading-relaxed font-mono">{example.command}</code>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed">{example.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Docker Compose Example */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-5">
              <div className="p-3.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-md">
                <TestTube className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Production Selenium Grid Setup</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Complete Docker Compose configuration for scalable browser testing infrastructure
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-white/20 rounded-md">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-white">docker-compose.yml</h3>
              </div>
              <button
                onClick={copyComposeToClipboard}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-md transition-all duration-150 text-sm font-medium border border-white/30"
              >
                {copiedCompose ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedCompose ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="bg-gray-900 p-5 overflow-x-auto">
              <pre className="text-green-400 text-xs leading-relaxed font-mono">
                <code>{dockerComposeExample}</code>
              </pre>
            </div>

            <div className="px-5 py-4 bg-orange-50 border-t border-orange-200">
              <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2 text-sm">
                <Rocket className="w-4 h-4" />
                Quick Start Commands
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <code className="bg-orange-100 text-orange-800 px-2.5 py-1 rounded-md font-mono font-medium">docker-compose up -d</code>
                    <span className="text-orange-700">Start the grid</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <code className="bg-orange-100 text-orange-800 px-2.5 py-1 rounded-md font-mono font-medium text-xs">docker-compose scale chrome-node-1=3</code>
                    <span className="text-orange-700">Scale nodes</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-orange-600" />
                    <strong className="text-orange-900">Grid Console:</strong>
                    <span className="text-orange-700 font-mono">localhost:4444</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-orange-600" />
                    <strong className="text-orange-900">VNC Access:</strong>
                    <span className="text-orange-700 font-mono">localhost:7901-7906</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-12 mt-8 border-t border-gray-200 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/testing_professor.png"
              alt="Testing Professor Logo"
              className="w-12 h-12 rounded-full border-2 border-blue-200 shadow-md"
            />
            <span className="text-xl font-bold text-gray-900">
              Testing Professor
            </span>
          </div>
          <p className="text-gray-600 mb-5 text-sm">
            Complete Docker command reference for testing and production
          </p>
          <div className="flex flex-wrap justify-center gap-5 text-xs">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>Production-Ready</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <Zap className="w-4 h-4 text-blue-500" />
              <span>Copy-Paste Commands</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <BookOpen className="w-4 h-4 text-green-500" />
              <span>Real-World Examples</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <Award className="w-4 h-4 text-cyan-500" />
              <span>Expert-Level</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;