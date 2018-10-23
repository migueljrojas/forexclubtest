'use strict';

var TableGenerator = function() {
    var tableData = [
        {
            money: 5321,
            account: "123 456 000",
            country: "rusia"
        },
        {
            money: 3000,
            account: "425 238 238",
            country: "spain"
        },
        {
            money: 890,
            account: "123 543 548",
            country: "china"
        },
        {
            money: 777,
            account: "090 235 453",
            country: "rusia"
        },
        {
            money: 666,
            account: "009 281 443",
            country: "spain"
        },
        {
            money: 555,
            account: "515 654 522",
            country: "china"
        },
        {
            money: 444,
            account: "765 452 241",
            country: "rusia"
        },
        {
            money: 333,
            account: "562 183 816",
            country: "spain"
        },
        {
            money: 222,
            account: "642 452 555",
            country: "china"
        },
        {
            money: 111,
            account: "212 552 112",
            country: "rusia"
        }
    ];
    var table = document.querySelector('.libertex-ranking__table');
    var tableBody = document.querySelector('.libertex-ranking__table-body');
    var tableRows = tableBody.querySelectorAll('.libertex-ranking__table-row');

    populateTableWithData();

    function populateTableWithData() {
        var tableSortCriteriaInLocalStorage = isTableSorCriteriaInLocalStorage();

        if (tableSortCriteriaInLocalStorage) {
            var orderedTableData =
                tableData.concat().sort(compareValues(tableSortCriteriaInLocalStorage));
            getCellsData(orderedTableData);
        } else {
            getCellsData(tableData);
        }

        setActiveSort(tableSortCriteriaInLocalStorage);
    }

    function isTableSorCriteriaInLocalStorage() {
        return JSON.parse(localStorage.getItem('libertex-table-sort-criteria'));
    }

    function getCellsData(data) {

        data.forEach(function(row, index) {
            var rowCells = tableRows[index].querySelectorAll('.libertex-ranking__table-cell');

            rowCells[0].innerHTML = '<span>' + row.money + '</span>';
            rowCells[1].innerHTML = '<span>' + row.account + '</span>';
            rowCells[2].innerHTML = '<img src="images/' + row.country + '.png" alt="'+ row.country +'" />';
        });
    }

    table.addEventListener('click', sortTableData, false);

    function sortTableData(event) {

        var targetParent = event.target.parentNode;

        if (targetParent.hasAttribute('data-sort')) {
            var sortCriteria = targetParent.getAttribute('data-sort');
            var orderedTableData =
                tableData.concat().sort(compareValues(sortCriteria));

            getCellsData(orderedTableData);
            setActiveSort(sortCriteria);
            saveTableSortCriteria(sortCriteria);
        }
    }

    function setActiveSort(sortCriteria) {
        var tableRows = tableBody.querySelectorAll('.libertex-ranking__table-row');
        var sortedCells = document.querySelectorAll('.libertex-ranking__table-cell--sorted');
        var sortedCellsArray = [].slice.call(sortedCells);
        var tableHeader = document.querySelector('.libertex-ranking__table-header');
        var tableHeaderCells = tableHeader.querySelectorAll('.libertex-ranking__table-cell--header');
        var cellIndex = 0;


        if (sortCriteria === 'account') {
            cellIndex = 1;
        }

        if (sortCriteria === 'country') {
            cellIndex = 2;
        }

        sortedCellsArray.forEach(function(cell) {
            cell.classList.remove('libertex-ranking__table-cell--sorted');
        });

        for (var rowIndex = 0; rowIndex <= 2; rowIndex++) {
            var cells = tableRows[rowIndex].querySelectorAll('.libertex-ranking__table-cell');

            cells[cellIndex].classList.add('libertex-ranking__table-cell--sorted');
        }

        tableHeaderCells[cellIndex].classList.add('libertex-ranking__table-cell--sorted');
    }

    function compareValues(key) {
        return function(a, b) {

            var comparison = 0;
            if (a[key] > b[key]) {
                comparison = 1;
            } else if (a[key] < b[key]) {
                comparison = -1;
            }

            return comparison * -1;
        };
    }

    function saveTableSortCriteria(sortCriteria) {
        localStorage.setItem('libertex-table-sort-criteria', JSON.stringify(sortCriteria));
    }
}

module.exports = TableGenerator;
