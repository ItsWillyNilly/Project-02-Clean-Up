$(document).ready(function () {
    const user = $.get('/api/user_data').then(function (data) {
        return data;
    });

    $(document).on('click', '.item-type', (event) => {
        const itemType = $(event.target).text();

        $.ajax({
            method: 'GET',
            url: `/api/items/type/${itemType}`
        }).then(items => {
            // Clear any existing cards
            $('.item-card').remove();

            // Populate new cards for the selected type
            items.forEach(item => {
                const card = $(`
                    <div class="item-card">
                        <h3>${item.name}</h3>
                        <h4>${item.condition}</h4>
                        <h4>${item.type}</h4>
                        <p>${item.description}</p>
                        <p>Price: ${item.price}</p>
                        <!-- Add any other item details -->
                    </div>
                `);
                $('.item-container').append(card);
            });
        })
            .catch(error => {
                console.error('Error fetching items:', error);
            });
    });

    $.ajax({
        method: 'GET',
        url: '/api/items'
    }).then(items => {
        const type = items.map(item => {
            return item.type;
        });

        const uniqueType = [...new Set(type)];

        const typeContainer = document.getElementById('type-container');

        uniqueType.forEach(type => {
            const typeElement = document.createElement('div');
            typeElement.textContent = type;
            typeElement.classList.add('item-type');
            typeContainer.appendChild(typeElement);

            typeElement.addEventListener('click', () => {
                // Clear any existing cards
                $('.item-card').remove();

                // Fetch items of the clicked type
                $.ajax({
                    method: 'GET',
                    url: `/api/items?type=${type}`
                }).then(items => {
                    // Populate new cards for the selected type
                    items.forEach(item => {
                        const card = $(`
                    <div class="item-card">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                `);
                        $('.item-container').append(card);
                    });
                })
                    .catch(error => {
                        console.error('Error fetching items:', error);
                    });
            });
        });

    });


});