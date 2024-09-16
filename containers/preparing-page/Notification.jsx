import { AnimatedList } from "@/components/cards/Animated-Card";
import { cn } from "@/utils/cn";
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";
import moment from "moment";

const Notification = ({
  id,
  message,
  sub_message,
  created_at,
  handleUpdate,
}) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl py-2 px-3 bg-default-100 shadow-sm border border-default-200 flex justify-between items-center h-full"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-primary">
          <span className="text-lg">💬</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{message}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">
              {moment(created_at).fromNow()}
            </span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {sub_message}
          </p>
        </div>
      </div>
      <Button
        onClick={() => {
          handleUpdate(id);
        }}
        isIconOnly
        size="sm"
        variant="flat"
      >
        <X size={16} className="text-default-700" />
      </Button>
    </figure>
  );
};

export function NotificationList({ className, notifications, handleUpdate }) {
  return (
    <div
      className={cn(
        "relative flex w-full max-h-[167px] flex-col px-5 py-3 overflow-hidden bg-background md:shadow-xl border-b border-default-200",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} handleUpdate={handleUpdate} />
        ))}
      </AnimatedList>
    </div>
  );
}
