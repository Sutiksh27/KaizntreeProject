import { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import apiHelper from '../utilities/ApiHelper';
import { Category, Item } from '../utilities/types';
import ItemForm from '../components/ItemForm';
import CategoryForm from '../components/CategoryForm';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemDialogOpen = () => {
    setIsItemDialogOpen(true);
  }
  
  const handleCategoryDialogOpen = () => {
    setIsCategoryDialogOpen(true);
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemData = await apiHelper.getAllItems();
        const categoryData = await apiHelper.getAllCategories();

        setItems(itemData);
        setCategories(categoryData);
      } catch (error) {
        throw new Error("Error fetching data!");
      }
    };

    fetchData();
  }, [])

  const columns: GridColDef[] = [
    { field: "sku", headerName: "SKU", width: 200 },
    {field: "name", headerName: "Name", width: 250},
    { field: "tags", headerName: "Tags", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "stockStatus", headerName: "In Stock", type: 'number', width: 150},
    { field: "availableStock", headerName: "Available Stock", type: 'number', width: 150},
  ];

  const rows = items.map((item) => ({
    id: item.sku,
    ...item,
    tags: item.tags.map((tag) => tag.name).join(', '),
    category: item.category.name,
    stockStatus: item.stockStatus,
    availableStock: item.availableStock,
  }));

  return (
    <div className='flex flex-col p-4 w-screen'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col justify-evenly w-1/2'>
          <span className='text-3xl font-bold'>Item Dashboard</span>
          <span className='text-lg'>All Items</span>
          <button className='text-lg text-white bg-green-600 rounded-md h-10 mx-2 my-8 w-1/3' onClick={handleCategoryDialogOpen}>NEW ITEM CATEGORY</button>
        </div>
        <div className='flex flex-col justify-items-end w-1/5'>
          <div className='flex flex-row p-2 justify-between'>
            <span className='mx-4'>Total Categories</span>
            <span>{categories.length}</span>
          </div>
          <div className='flex flex-row p-2 justify-between'>
            <span className='mx-4'>Total Items</span>
            <span>{items.length}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-between bg-gray-300 p-2 rounded-md' onClick={toggleDropdown}>
        <span className='text-lg'>{categories.length} Categories</span>
        <span className='text-lg font-bold'>+</span>
      </div>
      {isOpen && (
        <div className='flex flex-col border-2'>
          <div className='flex flex-row'>
            <button className='text-lg text-white bg-green-600 rounded-md h-10 mx-2 my-8 w-1/6' onClick={handleItemDialogOpen}>NEW ITEM</button>
            <button className='text-lg text-gray-500 font-semibold bg-gray-300 rounded-md h-10 mx-2 my-8 w-1/6'>OPTIONS</button>
          </div>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                }
              }
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{
              toolbar: GridToolbar,
            }}
            />
        </div>
      )}

      <ItemForm isItemDialogOpen={isItemDialogOpen} setIsItemDialogOpen={setIsItemDialogOpen}/>
      <CategoryForm isCategoryDialogOpen={isCategoryDialogOpen} setIsCategoryDialogOpen={setIsCategoryDialogOpen}/>

    </div>
  )
}

export default Dashboard