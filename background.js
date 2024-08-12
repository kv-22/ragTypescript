chrome.storage.local.get(['storage_container'], function(result) {
    let storageData = result.storage_container;
    
    if (storageData) {
        let parser = new DOMParser();

        for (let url in storageData) {
            if (storageData.hasOwnProperty(url)) {
                let htmlContent = storageData[url];

                let doc = parser.parseFromString(htmlContent, 'text/html');

                let paragraphs = doc.querySelectorAll('p');

                let combinedText = '';
                paragraphs.forEach(paragraph => {
                    combinedText += paragraph.textContent + ' ';
                });

                combinedText = combinedText.replace(/\s+/g, ' ').trim();

                console.log(`Combined text for ${url}:`);
                console.log(combinedText);
                console.log('---');
            }
        }
    } else {
        console.log('No data found in chrome.storage.local');
    }
});
