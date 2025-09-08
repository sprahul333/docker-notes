import React, { useState } from 'react';
import { 
  Container, 
  Server, 
  Play, 
  Square, 
  RotateCcw, 
  Download, 
  Upload, 
  Trash2, 
  Copy, 
  Monitor,
  HardDrive,
  Zap,
  Shield,
  Layers,
  Terminal,
  ChevronRight,
  CheckCircle,
  Apple,
  Laptop,
  Settings,
  ExternalLink,
  AlertCircle,
  CheckSquare,
  Code,
  FileText,
  Database,
  Globe
} from 'lucide-react';

function App() {
  const [copiedCommand, setCopiedCommand] = useState<string>('');

 const copyToClipboard = (command: string) => {
  navigator.clipboard.writeText(command);
  setCopiedCommand(command);
  const timeoutId = setTimeout(() => setCopiedCommand(''), 2000);
  
  // You might want to clear this timeout if component unmounts
  return () => clearTimeout(timeoutId);
};

  const dockerCommands = [
    {
      command: 'docker images',
      description: 'Displays the list of images that are present in the system',
      example: 'docker images',
      useCase: 'Check what Docker images you have available locally before running containers',
      icon: <Layers className="h-5 w-5" />
    },
    {
      command: 'docker ps -a',
      description: 'Displays the complete list of containers (running, stopped, etc.)',
      example: 'docker ps -a',
      useCase: 'Monitor all containers to understand your current Docker environment state',
      icon: <Container className="h-5 w-5" />
    },
    {
      command: 'docker ps',
      description: 'Displays the list of running containers',
      example: 'docker ps',
      useCase: 'Quick check to see which containers are currently active and consuming resources',
      icon: <Container className="h-5 w-5" />
    },
    {
      command: 'docker stop <container>',
      description: 'Stops the execution of the given container',
      example: 'docker stop my-app-container',
      useCase: 'Gracefully stop a running container when you need to perform maintenance',
      icon: <Square className="h-5 w-5" />
    },
    {
      command: 'docker start <container>',
      description: 'Starts the execution of a stopped container',
      example: 'docker start my-app-container',
      useCase: 'Resume a previously stopped container without losing its state',
      icon: <Play className="h-5 w-5" />
    },
    {
      command: 'docker restart <container>',
      description: 'Restart a container that is currently running or stopped',
      example: 'docker restart my-app-container',
      useCase: 'Apply configuration changes or recover from application errors',
      icon: <RotateCcw className="h-5 w-5" />
    },
    {
      command: 'docker-compose up -d',
      description: 'Run docker compose file in detached mode',
      example: 'docker-compose up -d',
      useCase: 'Start multi-container applications defined in docker-compose.yml',
      icon: <Server className="h-5 w-5" />
    },
    {
      command: 'docker-compose down',
      description: 'Shuts down all running containers in docker compose',
      example: 'docker-compose down',
      useCase: 'Clean shutdown of entire application stack including networks and volumes',
      icon: <Square className="h-5 w-5" />
    },
    {
      command: 'docker-compose up -d --scale',
      description: 'Run docker compose file and scale specific containers',
      example: 'docker-compose up -d --scale web=3',
      useCase: 'Scale specific services to handle increased load or testing scenarios',
      icon: <Server className="h-5 w-5" />
    },
    {
      command: 'docker push <image>',
      description: 'Pushes images to Docker Hub or registry',
      example: 'docker push myusername/my-app:v1.0',
      useCase: 'Share your custom Docker images with team members or deploy to production',
      icon: <Upload className="h-5 w-5" />
    },
    {
      command: 'docker pull <image>',
      description: 'Pulls images from Docker Hub',
      example: 'docker pull nginx:latest',
      useCase: 'Download the latest version of an image for local development',
      icon: <Download className="h-5 w-5" />
    },
    {
      command: 'docker run <image>',
      description: 'Runs a Docker image and creates a new container',
      example: 'docker run -p 3000:3000 my-react-app',
      useCase: 'Start a new container instance from an image with port mapping',
      icon: <Play className="h-5 w-5" />
    },
    {
      command: 'docker run --name <name>',
      description: 'Runs docker image with a custom container name',
      example: 'docker run --name my-web-app nginx:latest',
      useCase: 'Create containers with meaningful names instead of random generated ones',
      icon: <Play className="h-5 w-5" />
    },
    {
      command: 'docker run -d <image>',
      description: 'Runs the docker image as a background process',
      example: 'docker run -d nginx:latest',
      useCase: 'Run containers in the background without blocking your terminal',
      icon: <Play className="h-5 w-5" />
    },
    {
      command: 'docker run --rm <image>',
      description: 'Runs docker image and removes container after execution',
      example: 'docker run --rm ubuntu:latest echo "Hello World"',
      useCase: 'Run temporary containers that clean up automatically after completion',
      icon: <Play className="h-5 w-5" />
    },
    {
      command: 'docker build -t <tag> .',
      description: 'Builds a Docker image from Dockerfile',
      example: 'docker build -t myapp:v1.0 .',
      useCase: 'Create a custom Docker image from your application source code',
      icon: <Layers className="h-5 w-5" />
    },
    {
      command: 'docker tag <image> <tag>',
      description: 'Tags an image for better version control',
      example: 'docker tag myapp:latest myapp:v1.0',
      useCase: 'Create version tags for your images to track different releases',
      icon: <Layers className="h-5 w-5" />
    },
    {
      command: 'docker rmi <image>',
      description: 'Removes the docker image locally from the system',
      example: 'docker rmi nginx:latest',
      useCase: 'Clean up unused images to free disk space',
      icon: <Trash2 className="h-5 w-5" />
    },
    {
      command: 'docker rmi -f $(docker images -aq)',
      description: 'Deletes all images that are present and not running',
      example: 'docker rmi -f $(docker images -aq)',
      useCase: 'Nuclear option to clean all unused images from your system',
      icon: <Trash2 className="h-5 w-5" />
    },
    {
      command: 'docker system prune -a',
      description: 'Removes all unused containers, images, and build cache',
      example: 'docker system prune -a',
      useCase: 'Free up disk space by cleaning unused Docker resources',
      icon: <Trash2 className="h-5 w-5" />
    }
  ];

  const volumeMappingExamples = [
    {
      platform: 'macOS/Linux',
      syntax: 'docker run -v ${PWD}/reports:/app/reports myapp:latest',
      description: 'Maps the reports folder from current directory to container'
    },
    {
      platform: 'Windows PowerShell',
      syntax: 'docker run -v ${PWD}/reports:/app/reports myapp:latest',
      description: 'PowerShell uses ${PWD} for current directory path'
    },
    {
      platform: 'Windows Command Prompt',
      syntax: 'docker run -v %cd%/reports:/app/reports myapp:latest',
      description: 'Command Prompt uses %cd% for current directory path'
    }
  ];

  const installationSteps = {
    windows: [
      {
        step: 1,
        title: 'System Requirements',
        content: 'Windows 10 64-bit: Pro, Enterprise, or Education (Build 16299 or later) or Windows 11',
        icon: <CheckSquare className="h-5 w-5" />
      },
      {
        step: 2,
        title: 'Enable WSL 2',
        content: 'Enable Windows Subsystem for Linux (WSL) 2 feature in Windows Features',
        icon: <Settings className="h-5 w-5" />
      },
      {
        step: 3,
        title: 'Download Docker Desktop',
        content: 'Download Docker Desktop for Windows from the official Docker website',
        icon: <Download className="h-5 w-5" />
      },
      {
        step: 4,
        title: 'Install and Configure',
        content: 'Run the installer and follow the setup wizard. Restart when prompted',
        icon: <CheckCircle className="h-5 w-5" />
      }
    ],
    mac: [
      {
        step: 1,
        title: 'System Requirements',
        content: 'macOS 10.15 or newer (Intel) or macOS 11 or newer (Apple Silicon)',
        icon: <CheckSquare className="h-5 w-5" />
      },
      {
        step: 2,
        title: 'Download Docker Desktop',
        content: 'Download Docker Desktop for Mac (Intel or Apple Silicon) from Docker Hub',
        icon: <Download className="h-5 w-5" />
      },
      {
        step: 3,
        title: 'Install Application',
        content: 'Drag Docker.app to Applications folder and launch it',
        icon: <CheckCircle className="h-5 w-5" />
      },
      {
        step: 4,
        title: 'Grant Permissions',
        content: 'Allow Docker Desktop to access your system when prompted',
        icon: <Shield className="h-5 w-5" />
      }
    ],
    linux: [
      {
        step: 1,
        title: 'Update Package Index',
        content: 'sudo apt-get update && sudo apt-get install ca-certificates curl gnupg',
        icon: <Terminal className="h-5 w-5" />
      },
      {
        step: 2,
        title: 'Add Docker GPG Key',
        content: 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg',
        icon: <Shield className="h-5 w-5" />
      },
      {
        step: 3,
        title: 'Add Repository',
        content: 'echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null',
        icon: <Database className="h-5 w-5" />
      },
      {
        step: 4,
        title: 'Install Docker Engine',
        content: 'sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io',
        icon: <CheckCircle className="h-5 w-5" />
      }
    ]
  };

  const [selectedPlatform, setSelectedPlatform] = useState<'windows' | 'mac' | 'linux'>('windows');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent opacity-20"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30">
              <Container className="h-16 w-16 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
            Master Docker
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            From dual-boot frustrations to seamless containerization. Learn Docker from the ground up 
            with comprehensive commands, real-world examples, and best practices.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#installation" 
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Install Docker
            </a>
            <a 
              href="#commands" 
              className="px-8 py-4 border-2 border-gray-400 hover:border-white rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-gray-900"
            >
              View Commands
            </a>
          </div>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="py-20 px-4 bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            The Evolution: From Dual Boot to <span className="text-blue-400">Containers</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-2xl border border-red-500/20">
              <div className="mb-6 flex justify-center">
                <div className="p-3 bg-red-500/20 rounded-full">
                  <Monitor className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-red-300">The Dual Boot Era</h3>
              <p className="text-gray-300 leading-relaxed">
                Developers had to install multiple operating systems on their machines, 
                switching between them to test applications. This was time-consuming, 
                resource-intensive, and often led to compatibility issues.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-2xl border border-yellow-500/20">
              <div className="mb-6 flex justify-center">
                <div className="p-3 bg-yellow-500/20 rounded-full">
                  <HardDrive className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">Virtual Machines</h3>
              <p className="text-gray-300 leading-relaxed">
                VMs provided isolation but were heavy on resources, slow to start, 
                and required significant overhead for each instance. Managing multiple 
                VMs became complex and expensive.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl border border-blue-500/20">
              <div className="mb-6 flex justify-center">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Container className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-300">Docker Revolution</h3>
              <p className="text-gray-300 leading-relaxed">
                Containers share the host OS kernel, making them lightweight, fast, 
                and efficient. Applications run consistently across any environment, 
                from development to production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Docker Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why <span className="text-blue-400">Docker?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: 'Lightning Fast',
                description: 'Start containers in seconds, not minutes'
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: 'Consistent',
                description: 'Same environment across dev, test, and production'
              },
              {
                icon: <Layers className="h-8 w-8" />,
                title: 'Portable',
                description: 'Run anywhere - laptop, server, or cloud'
              },
              {
                icon: <Server className="h-8 w-8" />,
                title: 'Scalable',
                description: 'Easily scale applications up or down'
              }
            ].map((benefit, index) => (
              <div key={index} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Docker Desktop Installation Section */}
      <section id="installation" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Install <span className="text-blue-400">Docker Desktop</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Get started with Docker by installing Docker Desktop on your operating system
          </p>
          
          {/* Platform Selection */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/50 rounded-lg p-2 flex gap-2">
              <button
                onClick={() => setSelectedPlatform('windows')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  selectedPlatform === 'windows' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Laptop className="h-5 w-5" />
                Windows
              </button>
              <button
                onClick={() => setSelectedPlatform('mac')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  selectedPlatform === 'mac' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Apple className="h-5 w-5" />
                macOS
              </button>
              <button
                onClick={() => setSelectedPlatform('linux')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  selectedPlatform === 'linux' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Terminal className="h-5 w-5" />
                Linux
              </button>
            </div>
          </div>

          {/* Installation Steps */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {installationSteps[selectedPlatform].map((step, index) => (
                <div key={index} className="flex gap-4 p-6 bg-gray-900/50 rounded-xl border border-gray-700/50">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-blue-400">
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-bold text-blue-300">{step.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.content}</p>
                    {selectedPlatform === 'linux' && step.step > 1 && (
                      <div className="mt-3 bg-gray-800/80 rounded-lg p-3">
                        <code className="text-green-400 text-xs font-mono break-all">
                          {step.content}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {/* Download Links */}
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl border border-blue-500/20">
                <h3 className="text-xl font-bold mb-4 text-blue-300">Official Download Links</h3>
                <div className="space-y-3">
                  <a 
                    href="https://www.docker.com/products/docker-desktop/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group"
                  >
                    <Download className="h-5 w-5 text-blue-400" />
                    <span className="flex-1">Docker Desktop Official Page</span>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-400" />
                  </a>
                  <a 
                    href="https://docs.docker.com/get-docker/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group"
                  >
                    <Settings className="h-5 w-5 text-blue-400" />
                    <span className="flex-1">Installation Documentation</span>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-400" />
                  </a>
                </div>
              </div>

              {/* System Requirements */}
              <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl border border-yellow-500/20">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">System Requirements</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  {selectedPlatform === 'windows' && (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span>Windows 10/11 64-bit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span>WSL 2 feature enabled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span>4GB RAM minimum</span>
                      </div>
                    </>
                  )}
                  {selectedPlatform === 'mac' && (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span>macOS 10.15+ (Intel) or 11+ (Apple Silicon)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span>4GB RAM minimum</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span>VirtualBox prior to version 4.3.30 must be uninstalled</span>
                      </div>
                    </>
                  )}
                  {selectedPlatform === 'linux' && (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span>64-bit kernel and CPU support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span>KVM virtualization support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-400" />
                        <span>QEMU must be version 5.2 or newer</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Post Installation */}
              <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl border border-green-500/20">
                <h3 className="text-xl font-bold mb-4 text-green-300">After Installation</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-green-400" />
                    <span>Verify installation: <code className="text-green-400 font-mono">docker --version</code></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-green-400" />
                    <span>Test with: <code className="text-green-400 font-mono">docker run hello-world</code></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-green-400" />
                    <span>Docker Desktop should appear in system tray/menu bar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Docker Commands Section */}
      <section id="commands" className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Essential <span className="text-blue-400">Docker Commands</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Master these commands to become productive with Docker
          </p>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {dockerCommands.map((cmd, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                      {cmd.icon}
                    </div>
                    <h3 className="text-lg font-bold text-blue-300">{cmd.command}</h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {cmd.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Example:</p>
                      <div className="flex items-center gap-2 bg-gray-800/80 rounded-lg p-3 group/code">
                        <code className="text-green-400 text-sm flex-1 font-mono">
                          {cmd.example}
                        </code>
                        <button
                          onClick={() => copyToClipboard(cmd.example)}
                          className="opacity-0 group-hover/code:opacity-100 transition-opacity p-1 hover:bg-gray-700 rounded"
                          title="Copy command"
                        >
                          {copiedCommand === cmd.example ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Use Case:</p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {cmd.useCase}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume Mapping Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-blue-400">Volume Mapping</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-4xl mx-auto">
            Link directories between your host machine and containers to persist data 
            and share files seamlessly across different environments.
          </p>
          
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">What is Volume Mapping?</h3>
            <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto mb-6">
              Volume mapping allows you to link a directory or file on your host machine to a directory 
              within a container. This enables data sharing between the container and host system, 
              ensuring that important files like reports, logs, or databases persist even when containers are stopped or removed.
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
              <h4 className="text-lg font-bold text-yellow-300 mb-3">Important Note:</h4>
              <p className="text-gray-300 leading-relaxed">
                Any files generated during container execution (like reports, logs, or test results) 
                will remain inside the container by default. Volume mapping ensures these files 
                are accessible on your host machine and persist even after the container is removed.
                Similarly, you might not have Chrome or Firefox browser mapped in the Linux OS, 
                which is where volume mapping becomes essential.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {volumeMappingExamples.map((example, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 group hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-blue-300">{example.platform}</h3>
                </div>
                
                <div className="mb-4">
                  <div className="bg-gray-800/80 rounded-lg p-4 group/code">
                    <div className="flex items-center gap-2">
                      <code className="text-green-400 text-sm flex-1 font-mono break-all">
                        {example.syntax}
                      </code>
                      <button
                        onClick={() => copyToClipboard(example.syntax)}
                        className="opacity-0 group-hover/code:opacity-100 transition-opacity p-1 hover:bg-gray-700 rounded flex-shrink-0"
                        title="Copy command"
                      >
                        {copiedCommand === example.syntax ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Start Your <span className="text-blue-400">Docker Journey?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Master containerization with hands-on examples, best practices, and real-world scenarios. 
            Join millions of developers who have revolutionized their deployment workflows with Docker.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <a 
              href="https://docs.docker.com/reference/cli/docker/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Official Docker Docs
              <ChevronRight className="h-5 w-5" />
            </a>
            <a 
              href="https://www.docker.com/products/docker-desktop/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-gray-400 hover:border-white rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-gray-900"
            >
              Download Docker
            </a>
          </div>
          
          <p className="text-gray-400">
            Need help? Check out the comprehensive Docker CLI reference for advanced commands and options.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Container className="h-10 w-10 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Docker Mastery Guide</h3>
            <p className="text-gray-400">
              Your comprehensive resource for learning Docker from basics to advanced concepts
            </p>
          </div>
          
          <div className="text-gray-500 text-sm">
            <p>© 2025 Docker Guide. Built for developers, by developers.</p>
            <p className="mt-2">
              Powered by modern web technologies and designed for the best learning experience.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;