# Hyperliquid Trade History Enhancer

A Tampermonkey userscript that enhances the **Hyperliquid** trade history by adding a **Fees/Trade ratio**, calculating **cumulative PnL**, and coloring positive/negative PnL values for better visual tracking.

---

## Features

- **Fees / Trade Column**: Calculates the fees relative to the trade value for each trade.
- **Cumulative PnL Column**: Tracks running profit/loss across all trades.
- **Colored PnL**: Positive PnL is green, negative PnL is red.
- Automatically updates when the **Trade History** tab is open.
---

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser.
4. Save the script and use the main script.
5. Visit [Hyperliquid](https://app.hyperliquid.xyz/) and open the **Trade History** tab to see the enhancements.

---

## Screenshots

### After
![After](https://raw.githubusercontent.com/0xmathisd/Hyperliquid-Trade-History-Enhancement/refs/heads/main/screenshots/after.gif)
*Enhanced Trade History with Fees / Trade ratio, Cumulative PNL, and colored PnL.*

![After](https://raw.githubusercontent.com/0xmathisd/Hyperliquid-Trade-History-Enhancement/refs/heads/main/screenshots/after_portfolio.png)

### Before
![Before](https://raw.githubusercontent.com/0xmathisd/Hyperliquid-Trade-History-Enhancement/refs/heads/main/screenshots/before_portfolio.png)
*Trade History without Fees / Trade or Cumulative PNL columns.*


---

## Usage

- Once installed, the script automatically detects when the **Trade History** tab is open.
- It will add two new columns:
  - **Fees / Trade**
  - **Cumulative PNL**
- PnL values are colored for quick reference:
  - Green: Positive profit
  - Red: Negative loss

The script updates every 3 seconds to reflect new trades in real-time.

---

## Notes

- Designed for Hyperliquid's web app table structure as of 2025.
- If the table layout changes in the future, the script may require adjustments.
- No external permissions or API access is needed (`@grant none`).

---
