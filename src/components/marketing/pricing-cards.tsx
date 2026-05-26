'use client';

import { ArrowRight, BadgeCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  type Locale,
  localizePath,
  type SiteDictionary,
} from '@/lib/i18n';

type PricingPlan = SiteDictionary['packages']['plans'][number];
type PricingRow = SiteDictionary['packages']['comparisonRows'][number];
type BillingCycle = 'monthly' | 'yearly';

type PricingCardsProps = {
  locale: Locale;
  plans: PricingPlan[];
  highlightRows: PricingRow[];
  comparisonRows: PricingRow[];
  comparisonTitle: string;
  comparisonDescription: string;
  comparisonFeatureLabel: string;
  footnote: string;
};

const cardAccents = [
  'card-accent-blue',
  'card-accent-teal',
  'card-accent-sky',
  'card-accent-amber',
];

function parseMonthlyPrice(plan: PricingPlan) {
  const match = plan.price.match(/(\d+(?:[.,]\d+)?)/);

  if (!match) {
    return null;
  }

  return Number(match[1].replace(',', '.'));
}

function formatEuro(amount: number, locale: Locale) {
  const numberLocale = locale === 'tr' ? 'tr-TR' : 'en-US';
  const roundedAmount = Math.round(amount * 100) / 100;
  const hasFraction = !Number.isInteger(roundedAmount);

  return `${roundedAmount.toLocaleString(numberLocale, {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: 2,
  })} €`;
}

function getBillingCopy(locale: Locale) {
  if (locale === 'tr') {
    return {
      monthly: 'Aylık',
      yearly: 'Yıllık',
      monthlyPeriod: '/ kullanıcı / ay',
      yearlyPeriod: '/ kullanıcı / yıl',
      savePrefix: 'Tasarruf',
    };
  }

  return {
    monthly: 'Monthly',
    yearly: 'Yearly',
    monthlyPeriod: '/ user / month',
    yearlyPeriod: '/ user / year',
    savePrefix: 'Save',
  };
}

function getPriceSummary(
  plan: PricingPlan,
  billingCycle: BillingCycle,
  locale: Locale,
) {
  const copy = getBillingCopy(locale);
  const monthlyPrice = parseMonthlyPrice(plan);

  if (billingCycle === 'monthly' || monthlyPrice === null) {
    return {
      current: plan.price,
      period: plan.period || '',
      original: null,
      savings: null,
    };
  }

  const original = monthlyPrice * 12;
  const current = monthlyPrice * 10;
  const savings = original - current;

  return {
    current: formatEuro(current, locale),
    period: copy.yearlyPeriod,
    original: formatEuro(original, locale),
    savings: `${copy.savePrefix}: ${formatEuro(savings, locale)}`,
  };
}

function PriceBlock({
  plan,
  billingCycle,
  locale,
}: {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  locale: Locale;
}) {
  const price = getPriceSummary(plan, billingCycle, locale);

  return (
    <div className="border-border mt-6 border-y py-5" aria-live="polite">
      {price.original ? (
        <p className="text-muted-foreground mb-1 text-sm font-semibold line-through">
          {price.original}
        </p>
      ) : null}
      <div className="flex flex-wrap items-end gap-2">
        <span className="text-foreground text-3xl font-bold">
          {price.current}
        </span>
        {price.period ? (
          <span className="text-muted-foreground pb-1 text-sm font-semibold">
            {price.period}
          </span>
        ) : null}
      </div>
      {price.savings ? (
        <p className="bg-success/10 text-success mt-3 inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-bold">
          {price.savings}
        </p>
      ) : null}
    </div>
  );
}

export function PricingCards({
  locale,
  plans,
  highlightRows,
  comparisonRows,
  comparisonTitle,
  comparisonDescription,
  comparisonFeatureLabel,
  footnote,
}: PricingCardsProps) {
  const [billingCycle, setBillingCycle] =
    useState<BillingCycle>('monthly');
  const billingCopy = getBillingCopy(locale);

  return (
    <Tabs
      value={billingCycle}
      onValueChange={(value) => setBillingCycle(value as BillingCycle)}
      className="flex flex-col gap-8"
    >
      <div className="flex justify-center">
        <TabsList className="h-11 rounded-[8px] p-1">
          <TabsTrigger value="monthly" className="h-9 rounded-[6px] px-5">
            {billingCopy.monthly}
          </TabsTrigger>
          <TabsTrigger value="yearly" className="h-9 rounded-[6px] px-5">
            {billingCopy.yearly}
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan, index) => {
          const purchaseHref = `${localizePath('/purchase', locale)}?plan=${plan.code}`;

          return (
            <article
              key={plan.code}
              className={`${cardAccents[index % cardAccents.length]} ${
                plan.highlighted
                  ? 'border-primary/40 shadow-soft'
                  : 'border-border-light shadow-light'
              } reveal-up relative flex flex-col rounded-[8px] border bg-card p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6 lg:min-h-[610px]`}
              style={{ animationDelay: `${Math.min(index * 90, 270)}ms` }}
            >
              <div className="flex flex-col gap-3">
                <p className="text-primary text-xs font-bold tracking-wide uppercase">
                  {plan.badge}
                </p>
                <h3 className="text-foreground text-2xl font-bold">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground min-h-18 text-sm leading-6">
                  {plan.description}
                </p>
              </div>

              <PriceBlock
                plan={plan}
                billingCycle={billingCycle}
                locale={locale}
              />

              <dl className="mt-5 grid gap-2">
                {highlightRows.map((row) => (
                  <div key={`${plan.code}-${row.feature}`} className="grid gap-1">
                    <dt className="text-muted-foreground text-[11px] leading-4 font-semibold">
                      {row.feature}
                    </dt>
                    <dd className="text-foreground text-sm leading-5 font-bold break-words">
                      {row.values[index] ?? '-'}
                    </dd>
                  </div>
                ))}
              </dl>

              <ul className="mt-5 grid gap-2">
                {plan.limits.map((limit) => (
                  <li
                    key={limit}
                    className="text-foreground flex items-start gap-2 text-sm font-semibold"
                  >
                    <CheckCircle2
                      className="text-primary mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{limit}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 grid gap-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-muted-foreground flex items-start gap-2 text-sm leading-6"
                  >
                    <BadgeCheck
                      className="text-success mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.highlighted ? 'default' : 'outline'}
                className="mt-auto w-full"
              >
                <Link href={purchaseHref}>
                  {plan.cta}
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
            </article>
          );
        })}
      </div>

      <div className="flex flex-col gap-5">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 text-center">
          <h3 className="text-foreground text-center text-2xl font-bold">
            {comparisonTitle}
          </h3>
          <p className="text-muted-foreground text-sm leading-6">
            {comparisonDescription}
          </p>
          <p className="text-muted-foreground text-xs leading-5">{footnote}</p>
        </div>

        <div className="grid gap-3 md:hidden">
          {plans.map((plan, planIndex) => {
            const price = getPriceSummary(plan, billingCycle, locale);

            return (
              <details
                key={plan.code}
                className="border-border-light bg-card group rounded-[8px] border p-4"
              >
                <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-3 text-base font-bold">
                  <span className="flex min-w-0 items-center gap-2">
                    <ArrowRight
                      className="text-muted-foreground size-4 shrink-0 transition-transform group-open:rotate-90"
                      aria-hidden="true"
                    />
                    <span className="truncate">{plan.name}</span>
                  </span>
                  <span className="text-primary shrink-0 text-sm font-semibold">
                    {price.current}
                  </span>
                </summary>
                <dl className="mt-4 grid gap-3">
                  {comparisonRows.map((row) => (
                    <div
                      key={`${plan.code}-${row.feature}`}
                      className="border-border grid gap-1 border-t pt-3 first:border-t-0 first:pt-0"
                    >
                      <dt className="text-muted-foreground text-xs leading-4 font-semibold">
                        {row.feature}
                      </dt>
                      <dd className="text-foreground text-sm leading-5 font-bold break-words">
                        {row.values[planIndex] ?? '-'}
                      </dd>
                    </div>
                  ))}
                </dl>
              </details>
            );
          })}
        </div>

        <div className="border-border-light bg-card shadow-light hidden overflow-x-auto rounded-[8px] border md:block">
          <table className="w-full table-fixed border-collapse text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="text-muted-foreground w-[32%] px-3 py-3 font-bold sm:px-4">
                  {comparisonFeatureLabel}
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.code}
                    className="text-foreground w-[22.666%] px-3 py-3 font-bold sm:px-4"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-border border-t">
                  <th className="text-foreground px-3 py-3 text-left font-semibold break-words whitespace-normal sm:px-4">
                    {row.feature}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      key={`${row.feature}-${plans[index]?.code || index}`}
                      className="text-muted-foreground px-3 py-3 font-medium break-words whitespace-normal sm:px-4"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Tabs>
  );
}
