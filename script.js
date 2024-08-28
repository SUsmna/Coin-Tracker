document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    const tableBody = document.querySelector('#crypto-table tbody');
    const searchInput = document.getElementById('search-input');
    const sortMarketCapBtn = document.getElementById('sort-market-cap');
    const sortPercentageChangeBtn = document.getElementById('sort-percentage-change');
  
    let cryptoData = [];
  
    // Fetch data using async/await
    async function fetchData() {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        cryptoData = data;
        renderTable(cryptoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    // Render the table
    function renderTable(data) {
      tableBody.innerHTML = '';
      data.forEach(coin => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${coin.image}" alt="${coin.name}" style="width: 25px; margin-right: 10px;">${coin.name}</td>
          <td>${coin.symbol.toUpperCase()}</td>
          <td>$${coin.current_price.toFixed(2)}</td>
          <td>$${coin.total_volume.toLocaleString()}</td>
          <td>$${coin.market_cap.toLocaleString()}</td>
          <td>${coin.price_change_percentage_24h.toFixed(2)}%</td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    // Search functionality
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = cryptoData.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
      );
      renderTable(filteredData);
    });
  
    // Sort by Market Cap
    sortMarketCapBtn.addEventListener('click', () => {
      const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
      renderTable(sortedData);
    });
  
    // Sort by Percentage Change
    sortPercentageChangeBtn.addEventListener('click', () => {
      const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      renderTable(sortedData);
    });
  
    // Fetch data on page load
    fetchData();
  });