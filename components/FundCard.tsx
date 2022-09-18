import moment from "moment";
import Link from "next/link";
import React, { FC } from "react";
import { getDiffInDays, randomPastelColor } from "../utils/helpers";
import { Button } from "./Button";

interface FundCardProps {
  fund: any;
  onActionClick: any;
}

export const FundCard = ({ fund, onActionClick }: FundCardProps) => {
  const color = randomPastelColor();

  const diffInDays = getDiffInDays(fund.endAt);

  return (
    <Link href={`/funds/${fund.fundAddress}`}>
      <div
        className="px-4 py-4 bg-gray-100 rounded-md hover:shadow-md transition-all cursor-pointer "
        style={{ background: color }}
      >
        <div className="flex justify-between items-center">
          <h4 className="font-black text-xs uppercase tracking-wider text-gray-900">
            {fund.balance} ETH <span className="font-bold">Recieved</span>
          </h4>

          <p className="text-xs font-bold tracking-wide text-gray-700">
            {fund.isActive
              ? diffInDays === 0
                ? `Last day`
                : `${diffInDays} days remaining`
              : "Fund Expired"}
          </p>
        </div>

        <div className="my-4"></div>

        <div className="flex items-center justify-between">
          <h6 className="font-bold text-lg">{fund.name}</h6>

          {fund.isActive ? (
            <Button
              variant="text"
              className="underline underline-offset-4 decoration-1 font-bold pr-0"
              onClick={() => onActionClick(fund)}
            >
              Donate
            </Button>
          ) : null}
        </div>
        <div className="my-2"></div>
        <p className="text-xs text-gray-500 line-clamp-2 tracking-wide leading-4">
          {fund.description}
        </p>
      </div>
    </Link>
  );
};
