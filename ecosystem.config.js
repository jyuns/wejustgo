module.exports = {
  apps : [{
    name: 'wejustgo',
    script: './server/index.js',

    exec_mode : 'cluster',
    instances : 'max',	
    
    env: {
      NODE_ENV: 'development'
    },

    env_production: {
      PORT : '3000',
      NODE_ENV: 'production',
    }
    
    },

  ],
};
