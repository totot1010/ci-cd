import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Todo


@pytest.mark.django_db
class TestTodoAPI:
    def setup_method(self):
        self.client = APIClient()
        self.todo_data = {
            'title': 'Test Todo',
            'description': 'Test Description',
            'completed': False
        }

    def test_create_todo(self):
        url = reverse('todo-list')
        response = self.client.post(url, self.todo_data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert Todo.objects.count() == 1
        assert Todo.objects.get().title == 'Test Todo'

    def test_list_todos(self):
        Todo.objects.create(**self.todo_data)
        url = reverse('todo-list')
        response = self.client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data['results']) == 1

    def test_retrieve_todo(self):
        todo = Todo.objects.create(**self.todo_data)
        url = reverse('todo-detail', kwargs={'pk': todo.pk})
        response = self.client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['title'] == todo.title

    def test_update_todo(self):
        todo = Todo.objects.create(**self.todo_data)
        url = reverse('todo-detail', kwargs={'pk': todo.pk})
        updated_data = {'title': 'Updated Todo', 'completed': True}
        response = self.client.patch(url, updated_data, format='json')
        assert response.status_code == status.HTTP_200_OK
        todo.refresh_from_db()
        assert todo.title == 'Updated Todo'
        assert todo.completed is True

    def test_delete_todo(self):
        todo = Todo.objects.create(**self.todo_data)
        url = reverse('todo-detail', kwargs={'pk': todo.pk})
        response = self.client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert Todo.objects.count() == 0