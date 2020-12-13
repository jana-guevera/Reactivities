import React, { FormEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity'
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    selectedActivity: IActivity | null;
    createActivity: (activity: IActivity) => void;
    editActivity: (actvity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({setEditMode, selectedActivity, createActivity, editActivity}) => {
    const initializeForm = () => {
        if(selectedActivity){
            return selectedActivity;
        }else{
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    const handleInputChange = (event:FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]:value});
    }

    const handleSubmit = () => {
        if(activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()
            }

            createActivity(newActivity);
        }else{
            editActivity(activity);
        }
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder='Title' onChange={handleInputChange} name='title' value={activity.title}/>
                <Form.TextArea rows={2} placeholder='Description' onChange={handleInputChange} name='description' value={activity.description}/>
                <Form.Input placeholder='Category' onChange={handleInputChange} name='category' value={activity.category}/>
                <Form.Input type='datetime-local' placeholder='Date' onChange={handleInputChange} name='date' value={activity.date}/>
                <Form.Input placeholder='City' onChange={handleInputChange} name='city' value={activity.city}/>
                <Form.Input placeholder='Venue' onChange={handleInputChange} name='venue' value={activity.venue}/>
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}