import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";

const checkbox = tv({
  slots: {
    base: "border-default",
    content: "text-default-500 text-xs font-medium",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-secondary bg-secondary hover:bg-secondary-500 hover:border-secondary-500",
        content: "text-secondary-foreground text-xs",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export const Checkbox = (props) => {
  const {
    color = "secondary",
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        radius="sm"
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color={color}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};
