import * as React from "react"
import { Link } from "gatsby"
import { Layout } from "../components/layout"
import { StoreContext } from "../context/store-context"
import { LineItem } from "../components/line-item"
import { formatPrice } from "../utils/format-price"
import {
  table,
  wrap,
  totals,
  summary,
  collapseColumn,
  labelColumn,
  imageHeader,
  productHeader,
  cartGrid,
  cartSummary,
  summaryDetails,
  subTotal,
  taxTotal,
  shipping,
  grandTotal,
  checkoutButton,
  checkoutButtonWrapper,
  emptyStateContainer,
  emptyStateHeading,
  emptyStateLink,
  title,
} from "./cart.module.scss"

export default function CartPage() {
  const { checkout, loading } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <>
      <main className={wrap}>
        {emptyCart ? (
          <div className={emptyStateContainer}>
            <h1 className={emptyStateHeading}>Your cart is empty</h1>
            <p>
              Looks like you haven’t found anything yet. Sometimes it’s hard to choose! Maybe this helps :)
            </p>
            <Link to="/search?s=BEST_SELLING" className={emptyStateLink}>
              View trending products
            </Link>
          </div>
        ) : (
          <>
            <h1 className={title}>Your cart</h1>
            <div className={cartGrid}>
              {checkout.lineItems.map((item) => {
                return (
                  <>
                    <LineItem item={item} key={item.id} />
                  </>
                )
              })}
              <div className={cartSummary}>
                <div className={summaryDetails}>
                  <div className={subTotal}>
                    <span>Subtotal:</span>
                    <span>
                      {formatPrice(
                        checkout.subtotalPriceV2.currencyCode,
                        checkout.subtotalPriceV2.amount
                      )}
                    </span>
                  </div>
                  <div className={taxTotal}>
                    <span>Taxes:</span>
                    <span>
                      {formatPrice(
                        checkout.totalTaxV2.currencyCode,
                        checkout.totalTaxV2.amount
                      )}
                    </span>
                  </div>
                  <div className={shipping}>
                    <span>Shipping:</span>
                    <span>Calculated at Checkout</span>
                  </div>
                </div>
                <div className={checkoutButtonWrapper}>
                  <div className={grandTotal}>
                    <span>Total &#x022C5;&nbsp;</span>
                    <span>
                      {formatPrice(
                        checkout.totalPriceV2.currencyCode,
                        checkout.totalPriceV2.amount
                      )}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className={checkoutButton}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  )
}

{
  /*
<h1 className={title}>Your cart</h1>
  <table className={table}>
    <thead>
      <tr>
        <th className={imageHeader}>Image</th>
        <th className={productHeader}>Product</th>
        <th className={collapseColumn}>Price</th>
        <th>Qty.</th>
        <th className={[totals, collapseColumn].join(" ")}>Total</th>
      </tr>
    </thead>
    <tbody>
      {checkout.lineItems.map((item) => (
        <LineItem item={item} key={item.id} />
      ))}

      <tr className={summary}>
        <td className={collapseColumn}></td>
        <td className={collapseColumn}></td>
        <td className={collapseColumn}></td>
        <td className={labelColumn}>Subtotal</td>
        <td className={totals}>
          {formatPrice(
            checkout.subtotalPriceV2.currencyCode,
            checkout.subtotalPriceV2.amount
          )}
        </td>
      </tr>
      <tr className={summary}>
        <td className={collapseColumn}></td>
        <td className={collapseColumn}></td>
        <td className={collapseColumn}></td>
        <td className={labelColumn}>Taxes</td>
        <td className={totals}>
          {formatPrice(
            checkout.totalTaxV2.currencyCode,
            checkout.totalTaxV2.amount
          )}
        </td>
      </tr>
      <tr className={summary}>
        <td className={collapseColumn}></td>
        <td className={collapseColumn}></td>
        <td className={collapseColumn}></td>
        <td className={labelColumn}>Shipping</td>
        <td className={totals}>Calculated at checkout</td>
      </tr>
      <tr className={grandTotal}>
        <td className={collapseColumn}></td>
        <td className={collapseColumn}></td>
        <td className={collapseColumn}></td>
        <td className={labelColumn}>Total Price</td>
        <td className={totals}>
          {formatPrice(
            checkout.totalPriceV2.currencyCode,
            checkout.totalPriceV2.amount
          )}
        </td>
      </tr>
    </tbody>
  </table>
  <div className={checkoutButtonWrapper}>
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={checkoutButton}
    >
      Checkout
    </button>
  </div>
*/
}
