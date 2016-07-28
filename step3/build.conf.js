module.exports = {
    module: {
        name: 'SampleApplication',
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
    },
    samples: {
        port: 8004,
        publish: {
            bucket: 'webui.pipdevs.com',
            accessKeyId: 'AKIAIEXTTAEEHYPHS3OQ',
            secretAccessKey: 'otMg2vQLZjF4Nkb90j1prtugoUCNm3XqLS/KkHyc',
            region: 'us-west-1'
        }
    }
};
