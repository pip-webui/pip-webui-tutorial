module.exports = {
    module: {
        name: 'app',
        styles: 'sample'
    },
    build: {
        js: true,
        ts: true,
        html: true,
        css: true,
        lib: true,
        images: true
    },
    file: {
        lib: [
            'node_modules/pip-webui/dist/**/*'
        ]
    }
};
