import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React from 'react'
import apiHelper from '../utilities/ApiHelper';

interface CategoryProps {
    isCategoryDialogOpen: boolean,
    setIsCategoryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryForm: React.FC<CategoryProps> = ({isCategoryDialogOpen, setIsCategoryDialogOpen}) => {

    const handleCategoryDialogClose = () => {
        setIsCategoryDialogOpen(false);
    }

    const createCategory = async (name: string) => {
        const category = {
            name: name
        }

        try {
            const response = await apiHelper.createCategory(category);
            console.log(response)
        } catch(e) {
            throw new Error("Can't create Category!");
        }

    }

  return (
      <>
          <Dialog
              open={isCategoryDialogOpen}
              onClose={handleCategoryDialogClose}
              PaperProps={{
                  component: 'form',
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                      event.preventDefault();
                      const formData = new FormData(event.currentTarget);
                      const formJson = Object.fromEntries((formData as any).entries());
                      const name = formJson.name;
                      handleCategoryDialogClose();
                      createCategory(name);
                  }
              }}
          >
              <DialogTitle>Add New Item</DialogTitle>
              <DialogContent>
                  <TextField
                      autoFocus
                      required
                      margin='dense'
                      id='name'
                      name='name'
                      label='Name'
                      type='text'
                      fullWidth
                      variant='outlined' />
                  
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCategoryDialogClose}> Cancel </Button>
                  <Button type='submit'> Submit </Button>
              </DialogActions>
          </Dialog>
      </>
  )
}

export default CategoryForm