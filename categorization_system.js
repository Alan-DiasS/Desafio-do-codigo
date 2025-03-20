const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'data', 'products.json');
const rawData = fs.readFileSync(filePath);
const products = JSON.parse(rawData);

// Função para normalizar strings removendo espaços extras e colocando tudo em minúsculas
function normalizeString(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/gi, ' ').split(' ').sort().join(' ');
}

// Função para categorizar produtos
function categorizeProducts(products) {
    let categories = {};
    
    products.forEach(product => {
        const normalizedTitle = normalizeString(product.title);
        
        if (!categories[normalizedTitle]) {
            categories[normalizedTitle] = {
                category: product.title,
                count: 0,
                products: []
            };
        }
        
        categories[normalizedTitle].count++;
        categories[normalizedTitle].products.push({
            title: product.title,
            supermarket: product.supermarket,
            price: product.price
        });
    });
    
    return Object.values(categories);
}

// Executando a categorização e salvando o resultado
const categorizedProducts = categorizeProducts(products);
const outputPath = path.join(__dirname, 'output', 'categorized_products.json');
fs.writeFileSync(outputPath, JSON.stringify(categorizedProducts, null, 2));

console.log('Categorização concluída! Veja o arquivo "categorized_products.json" na pasta output.');
