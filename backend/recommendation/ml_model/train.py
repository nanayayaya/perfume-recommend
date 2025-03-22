"""
香水推荐机器学习模型训练
使用XGBoost处理复杂的特征组合
"""

import numpy as np
import pandas as pd
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.metrics import mean_squared_error
import xgboost as xgb
from typing import Dict, List, Any, Tuple, Optional

# 定义特征和目标变量
FEATURES = [
    # 电影偏好
    'movie_grand_budapest', 'movie_blade_runner', 'movie_alice', 'movie_legend_1900',
    # 音乐偏好
    'music_jazz', 'music_rock', 'music_electronic', 'music_classical',
    # 艺术流派
    'art_surrealism', 'art_pop_art', 'art_renaissance', 'art_street_art',
    # 早餐偏好
    'breakfast_paris', 'breakfast_kyoto', 'breakfast_mexico', 'breakfast_california',
    # 神秘学偏好
    'mystical_tarot', 'mystical_runes', 'mystical_iching', 'mystical_shamanic',
    # 旅行偏好
    'travel_easter_island', 'travel_vienna', 'travel_bali', 'travel_moon',
    # 时代偏好
    'era_1920s', 'era_1960s', 'era_1980s', 'era_3020s'
]

# 目标变量 - 香水特性
TARGETS = [
    'complexity',  # 香水复杂度 (1-5)
    'intensity',   # 香水强度 (1-5)
    'longevity',   # 持久度 (1-5)
    'floral',      # 花香强度 (0-1)
    'woody',       # 木质香强度 (0-1)
    'oriental',    # 东方调强度 (0-1)
    'fresh',       # 清新调强度 (0-1)
    'aromatic',    # 芳香调强度 (0-1)
    'gourmand',    # 美食调强度 (0-1)
    'chypre'       # 柑苔调强度 (0-1)
]

def generate_synthetic_data(n_samples: int = 1000) -> pd.DataFrame:
    """
    生成合成训练数据
    在实际生产环境中，这将被真实用户数据替代
    
    Args:
        n_samples: 样本数量
        
    Returns:
        包含用户偏好和香水特性的DataFrame
    """
    # 为每个特征生成随机二进制值
    data = {}
    
    # 为每个问题类别生成互斥的选择
    # 电影偏好 (每个用户只选一个)
    movie_choices = np.random.choice(['movie_grand_budapest', 'movie_blade_runner', 
                                      'movie_alice', 'movie_legend_1900'], size=n_samples)
    for feature in ['movie_grand_budapest', 'movie_blade_runner', 'movie_alice', 'movie_legend_1900']:
        data[feature] = (movie_choices == feature).astype(int)
    
    # 音乐偏好 (每个用户只选一个)
    music_choices = np.random.choice(['music_jazz', 'music_rock', 'music_electronic', 'music_classical'], 
                                    size=n_samples)
    for feature in ['music_jazz', 'music_rock', 'music_electronic', 'music_classical']:
        data[feature] = (music_choices == feature).astype(int)
    
    # 艺术流派 (每个用户只选一个)
    art_choices = np.random.choice(['art_surrealism', 'art_pop_art', 'art_renaissance', 'art_street_art'], 
                                  size=n_samples)
    for feature in ['art_surrealism', 'art_pop_art', 'art_renaissance', 'art_street_art']:
        data[feature] = (art_choices == feature).astype(int)
    
    # 早餐偏好 (每个用户只选一个)
    breakfast_choices = np.random.choice(['breakfast_paris', 'breakfast_kyoto', 
                                         'breakfast_mexico', 'breakfast_california'], size=n_samples)
    for feature in ['breakfast_paris', 'breakfast_kyoto', 'breakfast_mexico', 'breakfast_california']:
        data[feature] = (breakfast_choices == feature).astype(int)
    
    # 神秘学偏好 (每个用户只选一个)
    mystical_choices = np.random.choice(['mystical_tarot', 'mystical_runes', 
                                        'mystical_iching', 'mystical_shamanic'], size=n_samples)
    for feature in ['mystical_tarot', 'mystical_runes', 'mystical_iching', 'mystical_shamanic']:
        data[feature] = (mystical_choices == feature).astype(int)
    
    # 旅行偏好 (每个用户只选一个)
    travel_choices = np.random.choice(['travel_easter_island', 'travel_vienna', 
                                      'travel_bali', 'travel_moon'], size=n_samples)
    for feature in ['travel_easter_island', 'travel_vienna', 'travel_bali', 'travel_moon']:
        data[feature] = (travel_choices == feature).astype(int)
    
    # 时代偏好 (每个用户只选一个)
    era_choices = np.random.choice(['era_1920s', 'era_1960s', 'era_1980s', 'era_3020s'], size=n_samples)
    for feature in ['era_1920s', 'era_1960s', 'era_1980s', 'era_3020s']:
        data[feature] = (era_choices == feature).astype(int)
    
    # 创建DataFrame
    df = pd.DataFrame(data)
    
    # 生成目标变量
    # 基于一些规则生成目标变量
    
    # 复杂度映射
    complexity_map = {
        'movie_grand_budapest': 3,
        'movie_blade_runner': 5,
        'movie_alice': 4,
        'movie_legend_1900': 2,
        'art_surrealism': 5,
        'art_pop_art': 2,
        'art_renaissance': 4,
        'art_street_art': 3
    }
    
    # 强度映射
    intensity_map = {
        'music_jazz': 4,
        'music_rock': 5,
        'music_electronic': 2,
        'music_classical': 3,
        'mystical_tarot': 4,
        'mystical_runes': 3,
        'mystical_iching': 4,
        'mystical_shamanic': 5
    }
    
    # 香调族映射
    family_maps = {
        'floral': {
            'movie_grand_budapest': 0.7,
            'music_classical': 0.6,
            'art_renaissance': 0.5,
            'breakfast_paris': 0.3
        },
        'woody': {
            'movie_legend_1900': 0.8,
            'mystical_runes': 0.7,
            'travel_easter_island': 0.6,
            'art_renaissance': 0.5
        },
        'oriental': {
            'music_jazz': 0.7,
            'music_rock': 0.6,
            'mystical_tarot': 0.8,
            'mystical_iching': 0.9,
            'era_1920s': 0.5
        },
        'fresh': {
            'breakfast_kyoto': 0.9,
            'breakfast_california': 0.8,
            'travel_bali': 0.7,
            'music_electronic': 0.5
        },
        'aromatic': {
            'mystical_shamanic': 0.9,
            'mystical_runes': 0.7,
            'breakfast_mexico': 0.6,
            'era_1960s': 0.5
        },
        'gourmand': {
            'movie_alice': 0.8,
            'breakfast_paris': 0.9,
            'art_pop_art': 0.6,
            'era_1980s': 0.4
        },
        'chypre': {
            'movie_blade_runner': 0.7,
            'travel_vienna': 0.6,
            'era_1920s': 0.8,
            'art_street_art': 0.5
        }
    }
    
    # 计算复杂度和强度
    df['complexity'] = 3.0  # 默认中等复杂度
    df['intensity'] = 3.0   # 默认中等强度
    df['longevity'] = 3.0   # 默认中等持久度
    
    # 为每个样本计算目标值
    for i, row in df.iterrows():
        # 复杂度
        complexity_score = 3.0  # 默认值
        complexity_weights = 0
        
        for feature, weight in complexity_map.items():
            if row[feature] == 1:
                complexity_score += weight
                complexity_weights += 1
        
        if complexity_weights > 0:
            complexity_score /= complexity_weights
            # 加入一些随机噪声
            complexity_score += np.random.normal(0, 0.5)
            # 确保值在合理范围内
            complexity_score = max(1, min(5, complexity_score))
        
        df.at[i, 'complexity'] = complexity_score
        
        # 强度
        intensity_score = 3.0  # 默认值
        intensity_weights = 0
        
        for feature, weight in intensity_map.items():
            if row[feature] == 1:
                intensity_score += weight
                intensity_weights += 1
        
        if intensity_weights > 0:
            intensity_score /= intensity_weights
            # 加入一些随机噪声
            intensity_score += np.random.normal(0, 0.5)
            # 确保值在合理范围内
            intensity_score = max(1, min(5, intensity_score))
        
        df.at[i, 'intensity'] = intensity_score
        
        # 持久度 (与强度相关)
        longevity = intensity_score * 0.8 + np.random.normal(0, 0.5)
        longevity = max(1, min(5, longevity))
        df.at[i, 'longevity'] = longevity
        
        # 计算各个香调族的强度
        for family, family_map in family_maps.items():
            family_score = 0.1  # 基础值
            family_weights = 0
            
            for feature, weight in family_map.items():
                if row[feature] == 1:
                    family_score += weight
                    family_weights += 1
            
            if family_weights > 0:
                family_score /= family_weights * 1.5  # 归一化
                # 加入一些随机噪声
                family_score += np.random.normal(0, 0.1)
                # 确保值在[0,1]范围内
                family_score = max(0, min(1, family_score))
            
            df.at[i, family] = family_score
    
    return df

def train_xgboost_models(data: pd.DataFrame, save_dir: str = None) -> Dict[str, Any]:
    """
    训练XGBoost模型
    
    Args:
        data: 训练数据
        save_dir: 模型保存目录
        
    Returns:
        训练好的模型字典
    """
    models = {}
    
    # 特征矩阵
    X = data[FEATURES]
    
    # 为每个目标训练单独的模型
    for target in TARGETS:
        print(f"Training model for {target}...")
        
        y = data[target]
        
        # 划分训练集和测试集
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # 定义DMatrix
        dtrain = xgb.DMatrix(X_train, label=y_train)
        dtest = xgb.DMatrix(X_test, label=y_test)
        
        # 设置参数
        params = {
            'objective': 'reg:squarederror',
            'eval_metric': 'rmse',
            'max_depth': 4,
            'eta': 0.1,
            'subsample': 0.8,
            'colsample_bytree': 0.8,
            'seed': 42
        }
        
        # 训练模型
        model = xgb.train(
            params,
            dtrain,
            num_boost_round=100,
            evals=[(dtrain, 'train'), (dtest, 'test')],
            early_stopping_rounds=10,
            verbose_eval=False
        )
        
        # 评估模型
        y_pred = model.predict(dtest)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        print(f"RMSE for {target}: {rmse:.4f}")
        
        # 保存模型
        models[target] = model
        
        if save_dir:
            os.makedirs(save_dir, exist_ok=True)
            model.save_model(os.path.join(save_dir, f"{target}_model.json"))
    
    # 保存特征名称
    if save_dir:
        with open(os.path.join(save_dir, "features.pkl"), "wb") as f:
            pickle.dump(FEATURES, f)
    
    return models

def predict_perfume_traits(models: Dict[str, Any], user_answers: Dict[str, Dict[str, str]]) -> Dict[str, float]:
    """
    预测用户可能喜欢的香水特性
    
    Args:
        models: 训练好的模型字典
        user_answers: 用户问卷回答
        
    Returns:
        预测的香水特性
    """
    # 将用户回答转换为特征向量
    features = {}
    for feature in FEATURES:
        features[feature] = 0
    
    # 电影映射
    movie_map = {
        "grand_budapest": "movie_grand_budapest",
        "blade_runner": "movie_blade_runner", 
        "alice": "movie_alice",
        "legend_1900": "movie_legend_1900"
    }
    
    # 音乐映射
    music_map = {
        "jazz": "music_jazz",
        "rock": "music_rock",
        "electronic": "music_electronic",
        "classical": "music_classical"
    }
    
    # 艺术映射
    art_map = {
        "surrealism": "art_surrealism",
        "pop_art": "art_pop_art",
        "renaissance": "art_renaissance",
        "street_art": "art_street_art"
    }
    
    # 早餐映射
    breakfast_map = {
        "paris": "breakfast_paris",
        "kyoto": "breakfast_kyoto",
        "mexico": "breakfast_mexico",
        "california": "breakfast_california"
    }
    
    # 神秘学映射
    mystical_map = {
        "tarot": "mystical_tarot",
        "runes": "mystical_runes",
        "iching": "mystical_iching",
        "shamanic": "mystical_shamanic"
    }
    
    # 旅行映射
    travel_map = {
        "easter_island": "travel_easter_island",
        "vienna": "travel_vienna",
        "bali": "travel_bali",
        "moon": "travel_moon"
    }
    
    # 时代映射
    era_map = {
        "1920s": "era_1920s",
        "1960s": "era_1960s",
        "1980s": "era_1980s",
        "3020s": "era_3020s"
    }
    
    # 将用户选择映射到特征
    if "1" in user_answers and "value" in user_answers["1"]:
        movie_value = user_answers["1"]["value"]
        if movie_value in movie_map:
            features[movie_map[movie_value]] = 1
    
    if "2" in user_answers and "value" in user_answers["2"]:
        music_value = user_answers["2"]["value"]
        if music_value in music_map:
            features[music_map[music_value]] = 1
    
    if "3" in user_answers and "value" in user_answers["3"]:
        art_value = user_answers["3"]["value"]
        if art_value in art_map:
            features[art_map[art_value]] = 1
    
    if "4" in user_answers and "value" in user_answers["4"]:
        breakfast_value = user_answers["4"]["value"]
        if breakfast_value in breakfast_map:
            features[breakfast_map[breakfast_value]] = 1
    
    if "5" in user_answers and "value" in user_answers["5"]:
        mystical_value = user_answers["5"]["value"]
        if mystical_value in mystical_map:
            features[mystical_map[mystical_value]] = 1
    
    if "6" in user_answers and "value" in user_answers["6"]:
        travel_value = user_answers["6"]["value"]
        if travel_value in travel_map:
            features[travel_map[travel_value]] = 1
    
    if "7" in user_answers and "value" in user_answers["7"]:
        era_value = user_answers["7"]["value"]
        if era_value in era_map:
            features[era_map[era_value]] = 1
    
    # 创建DMatrix
    feature_values = [features.get(f, 0) for f in FEATURES]
    dfeatures = xgb.DMatrix([feature_values])
    
    # 预测每个目标
    predictions = {}
    for target, model in models.items():
        pred = model.predict(dfeatures)[0]
        
        # 对于比例类型的目标，确保在[0,1]范围内
        if target not in ['complexity', 'intensity', 'longevity']:
            pred = max(0, min(1, pred))
        else:
            # 对于评分类型的目标，确保在[1,5]范围内
            pred = max(1, min(5, pred))
        
        predictions[target] = float(pred)
    
    return predictions

def main():
    """
    主函数
    """
    print("Generating synthetic training data...")
    data = generate_synthetic_data(n_samples=2000)
    
    print("Training XGBoost models...")
    save_dir = "models"
    models = train_xgboost_models(data, save_dir)
    
    print("Testing prediction with sample user input...")
    # 示例用户回答
    user_answers = {
        "1": {"value": "blade_runner"},
        "2": {"value": "jazz"},
        "4": {"value": "paris"},
        "5": {"value": "iching"}
    }
    
    predictions = predict_perfume_traits(models, user_answers)
    
    print("\nPredicted perfume traits:")
    for trait, value in predictions.items():
        print(f"{trait}: {value:.2f}")
    
    print("\nDone!")

if __name__ == "__main__":
    main() 