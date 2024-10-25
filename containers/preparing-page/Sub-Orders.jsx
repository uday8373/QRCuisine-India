import { Button, Progress } from "@nextui-org/react";
import { ChevronDown, ChevronUp, CircleX, ReceiptText } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";

const SubOrders = ({ orderData, statusData }) => {
  const [showOrder, setShowOrder] = useState(true);
  return (
    <section id="suborder">
      <div className="w-full flex flex-col gap-3 px-5 mb-56">
        <div
          onClick={() => {
            setShowOrder(!showOrder);
          }}
          className="w-full flex gap-2 bg-default-100 rounded-large p-3 border justify-between items-center "
        >
          <h3 className="text-default-700 font-medium text-medium text-center">
            {showOrder ? "Hide" : "Show"} Sub Orders (
            {orderData?.sub_orders.length} )
          </h3>
          <div>
            {showOrder ? (
              <ChevronUp className="ml-2 " />
            ) : (
              <ChevronDown className="ml-2 " />
            )}
          </div>
        </div>

        {showOrder && (
          <div className="w-full flex flex-col gap-3">
            {orderData?.sub_orders &&
              orderData.sub_orders.map((order, index) => (
                <div
                  key={index}
                  className="w-full flex flex-col bg-default-100 rounded-large px-3 py-4 border justify-between items-center gap-5"
                >
                  <div className="w-full flex justify-between items-center">
                    <h3 className="text-default-500 font-medium text-small">
                      Suborder ID : {order?.sub_order_id}
                    </h3>
                    <h3 className="text-default-500 font-medium text-small">
                      {moment(order?.created_at).fromNow()}
                    </h3>
                  </div>
                  <div className="w-full flex flex-col justify-center items-center gap-1">
                    <h2
                      className={`text-xl font-bold text-center ${
                        order?.status_id?.sorting === 1
                          ? "text-blue-500"
                          : order?.status_id?.sorting === 2
                          ? "text-primary-500"
                          : order?.status_id?.sorting === 3
                          ? "text-secondary-500"
                          : order?.status_id?.sorting === 4
                          ? "text-success-500"
                          : order?.status_id?.sorting === 5
                          ? "text-red-500"
                          : "text-amber-600"
                      }`}
                    >
                      Order {order?.status_id?.title}
                    </h2>
                    <h3 className="text-default-500  text-small">
                      Waiting Time: 07:11 Minutes
                    </h3>

                    <div className="w-full mt-2">
                      <Progress
                        classNames={{
                          indicator: `${
                            order?.status_id?.sorting === 1
                              ? "bg-blue-500"
                              : order?.status_id?.sorting === 2
                              ? "bg-primary-500"
                              : order?.status_id?.sorting === 3
                              ? "bg-secondary-500"
                              : order?.status_id?.sorting === 4
                              ? "bg-success-500"
                              : order?.status_id?.sorting === 5
                              ? "bg-red-500"
                              : "bg-amber-600"
                          }`,
                        }}
                        aria-label="status"
                        value={order?.status_id?.sorting}
                        minValue={0.88}
                        maxValue={
                          order?.status_id?.sorting === 5
                            ? statusData.length - 1
                            : order?.status_id?.sorting === 6
                            ? statusData.length
                            : statusData.length - 2
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-default-600 w-full mt-2">
                        {/* <span>Status</span> */}
                        {statusData &&
                          statusData
                            .filter((status, index) => {
                              if (order?.status_id?.sorting === 5) {
                                return index === 0 || index === 4;
                              } else if (order?.status_id?.sorting === 6) {
                                return index === 0 || index === 5;
                              }
                              return status.sorting < 5;
                            })
                            .map((status, index) => (
                              <span key={index}>{status.title}</span>
                            ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-2">
                    <Button
                      fullWidth
                      size="md"
                      color="danger"
                      variant="flat"
                      startContent={<CircleX size={18} />}
                    >
                      Cancel Sub Order
                    </Button>
                    <Button
                      size="md"
                      fullWidth
                      color="primary"
                      startContent={<ReceiptText size={18} />}
                    >
                      View Sub Order
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SubOrders;
