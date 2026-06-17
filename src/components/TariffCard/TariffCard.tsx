import type { ForexTariff } from "../../api/types";
import type { TariffContent } from "../../data/tariffContent";
import { getPriceForPeriod, formatPrice, getPeriodLabel } from "../../utils/price";
import { BuyBtnIcon } from "../icons/BuyBtnIcon";
import { TickIcon } from "../icons/TickIcon";
import { QuestionIcon } from "../icons/QuestionIcon";
import styles from "./TariffCard.module.scss";
import { DropDownIcon } from "../icons/DropDownIcon";
import { TerminalIconMain } from "../icons/TerminalIconMain";
import { DetailsDropdown } from "../DetailsDropdown/DetailsDropdown";
import { buildSpecSummary, getDropdownItems } from "../../utils/tariffDetails";
import { useState } from "react";

type TariffCardProps = {
  tariff: ForexTariff;
  content: TariffContent;
  period: number;
};

export function TariffCard({ tariff, content, period }: TariffCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownItems = getDropdownItems(tariff);
  const price = getPriceForPeriod(tariff, period);
  const specSummary = buildSpecSummary(tariff, content.terminals);
  const cardClassName = content.highlighted
    ? `${styles.card} ${styles.highlighted}`
    : styles.card;

  return (
    <article className={cardClassName}>
      {content.bestChoice && <span className={styles.badge}>BEST CHOICE</span>}

      <div className={styles.cardHead}>
        <header className={styles.head}>
          <div className={styles.priceHeader}>
            <h3 className={styles.title}>{tariff.title}</h3>
            <div className={styles.price}>
              {price !== null ? (
                <>
                  <span className={styles.priceValue}>{formatPrice(price)}</span>
                  <span className={styles.pricePeriod}>{getPeriodLabel(period)}</span>
                </>
              ) : (
                <span className={styles.priceValue}>—</span>
              )}
            </div>
          </div>

          <img src={content.icon} alt="" className={styles.headIcon} />
        </header>

        <div className={styles.details}>
          <span className={styles.detailsText}>{specSummary}</span>
          <div className={styles.detailsInfo} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button type="button" aria-label="Details" aria-expanded={isOpen} className={styles.detailsTrigger} onClick={() => setIsOpen((prev) => !prev)}>
              <DropDownIcon className={styles.detailsInfoIcon} />
            </button>
            <DetailsDropdown items={dropdownItems} isOpen={isOpen} />
          </div>
        </div>
      </div>

      <div className={styles.terminals}>
        <TerminalIconMain className={styles.terminalsIcon} />
        <span className={styles.terminalsLabel}>Terminals</span>
        <span className={styles.terminalsCount}>{content.terminals}</span>
        <QuestionIcon className={styles.terminalsHelp} />
      </div>

      <section className={`${styles.section} ${styles.featuresSection}`}>
        <h4 className={styles.sectionTitle}>ВОЗМОЖНОСТИ</h4>
        <ul className={styles.features}>
          {content.features.map((feature) => (
            <li key={feature} className={styles.feature}>
              <TickIcon className={styles.featureIcon} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.section} ${styles.suitableSection}`}>
        <h4 className={styles.sectionTitle}>ПОДХОДИТ ДЛЯ</h4>
        <ul className={styles.tags}>
          {content.suitableFor.map((item) => (
            <li key={item} className={styles.tag}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.actions}>
        <a className={styles.buy} href={`#/order/${tariff.id}`}>
          КУПИТЬ
        </a>
        <button type="button" className={styles.cart} aria-label="Add to cart">
          <BuyBtnIcon className={styles.cartIcon} />
        </button>
      </div>
    </article>
  );
}
