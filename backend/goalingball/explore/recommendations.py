from django.db import models
from django.utils import timezone
from users.models import User 
from goals.models import Goal
import numpy as np
from numpy.linalg import norm
import pickle
import base64

# def similarity(vec_a, vec_b):
#     return

def find_similar_goals(user_vector, user_id):
    # find other users with highest cosine similarity
    user_dict = []
    for user in User.objects.all():
        if user['id'] == user_id:
            continue
        if user['vector'] is None:
            user = User.objects.get(id=user.id)
            user.init_vector()
            
        np_bytes_other = base64.b64decode(user.vector)
        user_vector_other = pickle.loads(np_bytes_other) # decode

        if norm(user_vector_other) == 0:
            user_dict.append({'id': user.id, 'similarity': 0 })

        else:
            similarity = np.dot(user_vector, user_vector_other)/(norm(user_vector)*norm(user_vector_other)) # calculate cosine similarity
            user_dict.append({'id': user.id, 'similarity':similarity, 'username': user.username}) # set a dictionary with key as user id and value as similarity

    # sort the dictionary by highest similarity
    user_dict = sorted(user_dict, key=(lambda u: u['similarity']))
    user_dict.reverse()

    # get goals from the users with highest similarity NOTE : the limit is set to 20 #
    goal_list = []
    for user in user_dict:
        for goal in Goal.objects.filter(user_id=user['id']):
            np_bytes_goal = base64.b64decode(goal.vector)
            goal_vector = pickle.loads(np_bytes_goal)
            if norm(goal_vector) == 0:
                goal_list.append({'goal': goal, 'similarity': 0, 'username': user['username']})
            else:
                similarity = np.dot(user_vector, goal_vector)/(norm(user_vector)*norm(goal_vector))
                goal_list.append({'goal': goal, 'similarity': similarity, 'username': user['username']})
            if len(goal_list) > 20:
                goal_list = sorted(goal_list, key=(lambda g: g['similarity']))
                goal_list.reverse()
                return goal_list

    goal_list = sorted(goal_list, key=(lambda g: g['similarity']))
    goal_list.reverse()
    return goal_list

# when norm(user_vector) is 0
def default_recent(user_id):
    # return top 20 goals added most recently
    goal_list = []
    for goal in Goal.objects.all():
        if goal.user_id == user_id:
            continue
        goal_list.append({'goal': goal, 'updated_at': int(goal.updated_at.timestamp()), 'username': User.objects.get(id=goal.user_id).username})
        if len(goal_list) > 20:
            goal_list = sorted(goal_list, key=(lambda g: g['updated_at']))
            goal_list.reverse()
            return goal_list

    goal_list = sorted(goal_list, key=(lambda g: g['updated_at']))
    goal_list.reverse()
    return goal_list


