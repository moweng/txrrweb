

import webWorkerLoader from 'rollup-plugin-web-worker-loader';

export default {
    input: 'src/index.js',
    
    output: {
        file: 'dist/index.js',
        format: 'es'
    },
    plugins: [ 
        webWorkerLoader(),
    ],
};