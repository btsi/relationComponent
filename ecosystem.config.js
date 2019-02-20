module.exports = {
  apps: [{
    name: 'relationalComponent',
    script: '~/server/index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-86-240-133.compute-1.amazonaws.com',
      key: '~/.ssh/tutorial.pem',
      ref: 'origin/master',
      repo: 'git@github.com:microdynamicservices/relationalComponent.git',
      path: '/home/ubuntu/relationComponent',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}