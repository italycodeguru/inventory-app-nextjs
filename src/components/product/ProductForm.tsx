import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/src/types/product";
import { generateUniqueId } from "@/src/services/productsService";
import { useProductContext } from "@/src/context/productsContext";

// Define the Zod schema
const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number()
    .positive("Price must be positive")
    .min(0.01, "Price must be at least $0.01"),
  stock: z.number().nonnegative("Stock cannot be negative"),
});

type FormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialProduct?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialProduct: initialProductProp,
}) => {
  const { addNewProduct, updateExistingProduct } = useProductContext();
  const [initialProduct, setInitialProduct] = useState<Product | undefined>(
    undefined,
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialProduct || {
      id: "",
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  useEffect(() => {
    setInitialProduct(initialProductProp);
  }, [initialProductProp]);

  useEffect(() => {
    if (initialProduct) {
      setValue("name", initialProduct.name);
      setValue("description", initialProduct.description);
      setValue("price", initialProduct.price);
      setValue("stock", initialProduct.stock);
    }
  }, [initialProduct, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (initialProduct) {
      updateExistingProduct({ id: initialProduct.id, ...data });
      setInitialProduct(undefined);
    } else {
      addNewProduct({ id: generateUniqueId(), ...data });
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative bg-secondary/50 backdrop-blur-md  p-6 rounded-lg shadow-md border border-gray-500/30"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {initialProduct ? "Edit Product" : "Create Product"}
      </h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <input
              id="name"
              type="text"
              {...field}
              className={`mt-1 block w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-700"} bg-secondary/50 backdrop-blur-sm rounded-md shadow-sm`}
            />
          )}
        />
        {errors.name && (
          <p className="mt-1 text-red-400 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              id="description"
              {...field}
              rows={4}
              className={`mt-1 block w-full p-2 border ${errors.description ? "border-red-500" : "border-gray-700"} bg-secondary/50 backdrop-blur-sm rounded-md shadow-sm`}
            />
          )}
        />
        {errors.description && (
          <p className="mt-1 text-red-400 text-sm">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium">
          Price
        </label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <input
              id="price"
              type="number"
              {...field}
              onChange={(event) => field.onChange(Number(event.target.value))}
              className={`mt-1 block w-full p-2 border ${errors.price ? "border-red-500" : "border-gray-700"} bg-secondary/50 backdrop-blur-sm rounded-md shadow-sm`}
            />
          )}
        />
        {errors.price && (
          <p className="mt-1 text-red-400 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="stock" className="block text-sm font-medium">
          Stock
        </label>
        <Controller
          name="stock"
          control={control}
          render={({ field }) => (
            <input
              id="stock"
              type="number"
              {...field}
              onChange={(event) => field.onChange(Number(event.target.value))}
              className={`mt-1 block w-full p-2 border ${errors.stock ? "border-red-500" : "border-gray-700"} bg-secondary/50 backdrop-blur-sm rounded-md shadow-sm`}
            />
          )}
        />
        {errors.stock && (
          <p className="mt-1 text-red-400 text-sm">{errors.stock.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-primary  py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {initialProduct ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
