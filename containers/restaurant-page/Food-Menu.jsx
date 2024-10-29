import MenuList from "@/components/cards/Menu-List";
import { EmptyData } from "@/components/icons/empty";
import { Button, Divider, Tab, Tabs } from "@nextui-org/react";
import React from "react";

const FoodMenu = ({
  categoryData,
  selectedCategory,
  onCategoryChange,
  menuItems,
  onCartChange,
  cartItems,
  maxItems,
  onLoadMore,
  dataLoading,
  onCustomizedOpen,
  setSelecetedFoodItem,
}) => {
  return (
    <section
      id="food_menu_section"
      className="flex items-center justify-center w-full overflow-hidden"
    >
      <div className="w-full h-full flex-col max-w-screen-xl relative">
        <div className="flex flex-wrap gap-4 w-full mb-32 relative">
          <div className="sticky top-0 w-full py-2 z-20 backdrop-blur-xl px-5 border-b border-default-300">
            <Tabs
              size="md"
              aria-label="Tabs sizes"
              variant="light"
              color="primary"
              fullWidth
              selectedKey={selectedCategory ? selectedCategory.id : "all"}
              onSelectionChange={(key) => onCategoryChange(key)}
            >
              {categoryData && <Tab key="all" title="All" />}
              {categoryData.map((category) => (
                <Tab
                  className="whitespace-nowrap"
                  key={category.id}
                  title={
                    category.category_name.length > 20
                      ? `${category.category_name.substring(0, 20)}...`
                      : category.category_name
                  }
                />
              ))}
            </Tabs>
          </div>
          {menuItems.length === 0 ? (
            <div className="text-center py-10 flex flex-col gap-3 justify-center items-center w-full">
              <EmptyData size={85} />
              <p className="text-small">No Food Items Found</p>
            </div>
          ) : (
            menuItems.map((menuItem, index) => (
              <div className="w-full gap-4 flex flex-col px-5" key={index}>
                <MenuList
                  menuItem={menuItem}
                  onCartChange={onCartChange}
                  cartItems={cartItems}
                  onCustomizedOpen={onCustomizedOpen}
                  setSelecetedFoodItem={setSelecetedFoodItem}
                />
                {index !== menuItems.length - 1 && (
                  <div className="border border-dashed" />
                )}
              </div>
            ))
          )}
          {maxItems !== menuItems.length && (
            <div className="flex justify-center mt-2 w-full">
              <Button
                isLoading={dataLoading}
                onClick={onLoadMore}
                size="sm"
                color="primary"
                isDisabled={maxItems === menuItems.length}
              >
                See More
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FoodMenu;
