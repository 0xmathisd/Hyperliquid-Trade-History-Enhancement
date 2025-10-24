// ==UserScript==
// @name         Hyperliquid Trade History Fees Ratio + Cumulative PNL + Color
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       https://github.com/0xmathisd
// @description  Adds a column showing the trade fees/value ratio, calculates cumulative PnL, and colors positive/negative PnL in the Hyperliquid trade history
// @match        https://app.hyperliquid.xyz/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const TABLE_SELECTOR = 'table.sc-hTBuwn.dnPbCd';

    function addHeader(table) {
        const theadRow = table.querySelector('thead tr');
        if (!theadRow) return;

        if (![...theadRow.children].some(c => c.textContent.includes('Fees / Trade'))) {
            const td = document.createElement('td'); // <th> pour header
            td.textContent = 'Fees / Trade';
            td.style.color = 'rgb(148, 158, 156)';
            td.style.width = '120px';
            theadRow.appendChild(td);
        }
        if (![...theadRow.children].some(c => c.textContent.includes('Cumulative PNL'))) {
            const td = document.createElement('td'); // <th> pour header
            td.textContent = 'Cumulative PNL';
            td.style.color = 'rgb(148, 158, 156)';
            td.style.width = '120px';
            theadRow.appendChild(td);
        }
    }

    function waitForTable() {
        const table = document.querySelector(TABLE_SELECTOR);
        if (!table) {
            requestAnimationFrame(waitForTable);
            return;
        }
        console.log("ready");

        console.log(table);
        addHeader(table);
    }

    function walk(node) {
        if (!node) return;
        let global_amount = 0;
        const tradeHistoryTab = document.querySelector('#grbokk');
        console.log(tradeHistoryTab);
        let child = node.firstChild;
        while (child) {
            const next = child.nextSibling;

            if (child.nodeType === Node.ELEMENT_NODE) {
                const tag = child.tagName;

                if (tag !== 'SCRIPT' && tag !== 'STYLE' && tag !== 'TEXTAREA' && tag !== 'INPUT') {

                    // Si c'est un <tr> avec la classe ciblée
                    if (tag === 'TR' && child.classList.contains('sc-iOeugr') && child.classList.contains('gZZrjv')) {
                        const tds = child.querySelectorAll('td');
                        if (tds.length > 2 && tds.length !=10) {
                            const tradeValueId = tds[tds.length - 3];
                            const feesId = tds[tds.length - 2];
                            let content = tradeValueId.textContent || "";
                            content = content.replace(/[^0-9.]/g, "");

                            let feesContent = feesId.textContent || "";
                            feesContent = feesContent.replace(/[^0-9.]/g, "");

                            const newTd = document.createElement("td");
                            newTd.className = tradeValueId.className;
                            newTd.style.cssText = tradeValueId.style.cssText;

                            const value = parseFloat(content) || 0;
                            const fees = parseFloat(feesContent) || 0;

                            newTd.textContent = fees !== 0 ? ((fees / value)*100).toFixed(5)+" %" : "0";

                            child.appendChild(newTd);

                            // CLOSED PNL background
                            const closePnlId = tds[tds.length - 1];
                            content = closePnlId.textContent || "";

                            global_amount += parseFloat(content.replace(/[^0-9.-]/g, ""));

                            let backgroundcolor = "";

                            if (content.includes("-")) {
                                //backgroundcolor = "#f09b0024";
                            } else {
                                backgroundcolor = "green";
                            }
                            closePnlId.style.backgroundColor = backgroundcolor;

                            // Cumulative PNL
                            const newTdBis = document.createElement("td");
                            newTdBis.className = tradeValueId.className;
                            newTdBis.style.cssText = tradeValueId.style.cssText;

                            newTdBis.textContent = global_amount.toFixed(3) + "$";
                            if (global_amount < 0) {
                                backgroundcolor = "red";
                            } else {
                                backgroundcolor = "green";
                            }

                            child.appendChild(newTdBis);
                            newTdBis.style.backgroundColor = backgroundcolor;
                        }
                    }

                    walk(child);
                }
            }

            child = next;
        }
    }

    function verif_tradeHistory_tab_open(node) {
        if (!node) return false;

        if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains("grbokk")) {
            const text = node.textContent.trim();
            if (text === "Trade History") {
                return true;
            }
        }

        let child = node.firstChild;
        while (child) {
            const next = child.nextSibling;

            if (child.nodeType === Node.ELEMENT_NODE) {
                const tag = child.tagName;

                if (tag !== 'SCRIPT' && tag !== 'STYLE' && tag !== 'TEXTAREA' && tag !== 'INPUT') {
                    if (verif_tradeHistory_tab_open(child)) {
                        return true;
                    }
                }
            }

            child = next;
        }

        return false;
    }

    setInterval(() => {
        if (verif_tradeHistory_tab_open(document.body)){
            waitForTable();
            walk(document.body);
        }
    }, 3000);

})();
