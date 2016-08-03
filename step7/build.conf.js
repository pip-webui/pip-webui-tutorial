module.exports = {
    module: {
        name: 'app',
        index: 'sample'
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
        import: [
            'node_modules/pip-webui/dist/**/*'
        ]
    }
};
