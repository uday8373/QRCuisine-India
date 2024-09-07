import { Check, ConciergeBell } from "lucide-react";
import React from "react";

const Status = ({ orderData, statusData }) => {
  const activeId = orderData?.status_id?.sorting;

  return (
    <section id="status">
      <div className="w-full flex flex-col gap-3 py-5 px-5 mb-32">
        <div className="w-full flex flex-col gap-2 bg-default-100 rounded-large p-3">
          {statusData.map((status) => (
            <React.Fragment key={status.id}>
              <div className="w-full grid grid-cols-6 items-center py-2">
                <div
                  className={`w-8 h-8 col-span-1 flex justify-center items-center rounded-full ${
                    status?.id === orderData?.status_id?.id
                      ? "bg-primary"
                      : "bg-transparent"
                  }`}
                >
                  <h3
                    className={`text-medium font-semibold  ${
                      status?.id === orderData?.status_id?.id
                        ? "text-white"
                        : "text-default-400"
                    }`}
                  >
                    {status?.sorting}
                  </h3>
                </div>
                <div className="col-span-4">
                  <h2
                    className={`text-medium font-semibold ${
                      status?.id === orderData?.status_id?.id
                        ? "text-default-800"
                        : "text-default-400"
                    }`}
                  >
                    {status?.title}
                  </h2>
                  {status?.id === orderData?.status_id?.id && (
                    <h3 className="text-small text-default-600 tracking-tighter">
                      {status.description}
                    </h3>
                  )}
                </div>
                <div className="flex col-span-1 justify-end">
                  {status?.sorting <= activeId && (
                    <Check
                      className={` ${
                        status?.id === orderData?.status_id?.id
                          ? "text-success mt-3"
                          : "text-default-400"
                      }`}
                    />
                  )}
                </div>
              </div>
              {status !== statusData[statusData.length - 1] && (
                <div className="border w-full border-dashed border-default-300" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="w-full flex py-4 bg-default-100 rounded-large gap-4 px-3">
          <div className="col-span-1 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex justify-center items-center">
              <ConciergeBell size={24} className="text-primary mb-1" />
            </div>
          </div>
          <div className="col-span-5 flex gap-0.5 flex-col">
            <h2 className="text-medium font-medium text-default-700">
              Assigned Waiter :
            </h2>
            <h2 className="text-small text-default-600">
              {orderData?.waiters?.name ? (
                orderData?.waiters?.name
              ) : (
                <span className="animate-pulse">pending ...</span>
              )}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Status;
