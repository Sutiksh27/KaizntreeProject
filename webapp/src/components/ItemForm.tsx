
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, OutlinedInput, TextField, FormGroup, FormControlLabel, FormControl, RadioGroup, Radio } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react'
import { Category, Tag } from '../utilities/types';
import apiHelper from '../utilities/ApiHelper';

interface ItemFormProps {
    isItemDialogOpen: boolean,
    setIsItemDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ItemForm: React.FC<ItemFormProps> = ({isItemDialogOpen, setIsItemDialogOpen}) => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>();

    
    useEffect(() => {
        const fetchData =  async () => {
            try {
                const tagsList = await apiHelper.getAllTags();
                const categoriesList = await apiHelper.getAllCategories();
                setTags(tagsList);
                setCategories(categoriesList);
            } catch (e) {
                throw new Error("Tag's not found!");
            }
        }

        fetchData();

    }, []);


    const handleItemDialogClose = () => {
        setIsItemDialogOpen(false);
    }

    const handleTagCheckboxChange = (tag: Tag) => {
        const newCheckedTags = selectedTags.includes(tag)
            ? selectedTags.filter((checkedTag) => checkedTag !== tag)
            : [...selectedTags, tag];

        setSelectedTags(newCheckedTags);
    };

    const handleCategoryRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCategoryName = (event.target as HTMLInputElement).value;

        // Find the corresponding Category object based on the tag name
        const selectedCategory = categories.find(category => category.name === selectedCategoryName);

        setSelectedCategory(selectedCategory);
    };

    const createItem = async (sku: string, name: string, tags: Tag[], category: Category, stockStatus: number, availableStock: number) => {
        const item = {
            sku: sku,
            name: name,
            tags: tags,
            category: category,
            stockStatus: stockStatus,
            availableStock: availableStock
        }

        try {
            const response = await apiHelper.createItem(item);
            console.log("Item: ", response)
        } catch (err) {
            throw new Error ("Can't create Item!")
        }
    }

  return (
    <>
    <Dialog
    open={isItemDialogOpen}
    onClose={handleItemDialogClose}
    PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const sku = formJson.sku;
            const name = formJson.name;
            const tags = formJson.tags;
            const category = formJson.category;
            const stockStatus = formJson.stockStatus;
            const availableStock = formJson.availableStock;
            handleItemDialogClose();
            createItem(sku, name, tags, category, stockStatus, availableStock);
        }
    }}
    >
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            required
            margin='dense'
            id='sku'
            name='sku'
            label='SKU'
            type='text'
            fullWidth
            variant='outlined'/>
            <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            name='name'
            label='Name'
            type='text'
            fullWidth
            variant='outlined'/>
            <span>Tags:</span>
            <FormGroup className='flex flex-row'>
                {tags.map((tag) => (
                    <FormControlLabel
                    id='tags'
                    name='tags'
                    label={tag.name}
                    key={tag.name}
                    control={
                        <Checkbox
                        checked={selectedTags.includes(tag)}
                        onChange={()=>handleTagCheckboxChange(tag)}/>
                    }/> 
                ))}
            </FormGroup>
            
            <div>Categories</div>
            <FormControl component="fieldset">
                <RadioGroup
                aria-label='Categories'
                name='category'
                value={selectedCategory ? selectedCategory.name : ''}
                onChange={handleCategoryRadioChange}>
                    {categories.map((category) => (
                        <FormControlLabel
                            key={category.name}
                            value={category.name}
                            control={<Radio/>}
                            label={category.name}
                        />
                            
                    ))}
                </RadioGroup>
            </FormControl>
            <TextField
            autoFocus
            required
            margin='dense'
            id='stockStatus'
            name='stockStatus'
            label='Stock Status'
            type='number'
            fullWidth
            variant='outlined'/>
            <TextField
            autoFocus
            required
            margin='dense'
            id='availableStock'
            name='availableStock'
            label='Available Stock'
            type='number'
            fullWidth
            variant='outlined'/>
        </DialogContent>
        <DialogActions>
                  <Button onClick={handleItemDialogClose}> Cancel </Button>
                  <Button type='submit'> Submit </Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default ItemForm