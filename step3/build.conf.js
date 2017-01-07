module.exports = {
    module: {
        name: 'app',
        styles: 'styles'
    },
    build: {
        js: false,
        ts: false,
        bundle: true,
        html: true,
        less: true,    
        sass: false,    
        lib: true,
        images: true,
        dist: true
    },
    browserify: {
        entries: [ 
            './src/index.ts'
        ]
    },
    file: {
        lib: [
            'node_modules/pip-webui-all/dist/**/*'
        ]
    }
};