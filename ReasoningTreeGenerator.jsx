import React, { useState, useCallback } from 'react';
import { Tree } from 'react-d3-tree';

// Custom node component for interactive exploration
const NodeComponent = ({ nodeDatum, toggleNode, handleNodeSelect }) => {
  return (
    <g>
      {/* Node circle */}
      <circle 
        r={15} 
        fill={nodeDatum.children ? '#52b788' : '#6c757d'}
        onClick={() => {
          toggleNode();
          handleNodeSelect(nodeDatum);
        }}
        style={{ cursor: 'pointer' }}
      />
      
      {/* Node label */}
      <text 
        fill="white" 
        strokeWidth="0.5" 
        x="20"
        dy="-10"
        style={{ 
          fontSize: '10px', 
          fontWeight: 'bold',
          pointerEvents: 'none'
        }}
      >
        {nodeDatum.name}
      </text>
    </g>
  );
};

// Reasoning Tree Generator Component
const ReasoningTreeGenerator = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [treeData, setTreeData] = useState({
    name: 'Initial Query',
    attributes: {
      description: 'Starting point of recursive reasoning'
    },
    children: [
      {
        name: 'Empirical Lens',
        attributes: {
          description: 'Data-driven, evidence-based analysis',
          focus: 'What does the evidence suggest?'
        },
        children: [
          {
            name: 'Quantitative Assessment',
            attributes: {
              description: 'Numerical analysis and statistical evaluation',
              key_questions: [
                'What measurable data supports this?',
                'How reliable are the sources?'
              ]
            }
          },
          {
            name: 'Reproducibility Check',
            attributes: {
              description: 'Verifying the consistency and repeatability of findings',
              key_concerns: [
                'Can these results be independently confirmed?',
                'Are there potential methodological biases?'
              ]
            }
          }
        ]
      },
      {
        name: 'Ethical Lens',
        attributes: {
          description: 'Moral and value-based considerations',
          focus: 'What are the ethical implications?'
        },
        children: [
          {
            name: 'Stakeholder Impact',
            attributes: {
              description: 'Analyzing how different groups are affected',
              key_questions: [
                'Who benefits?',
                'Who might be harmed?'
              ]
            }
          },
          {
            name: 'Moral Trade-offs',
            attributes: {
              description: 'Exploring conflicting ethical principles',
              key_concerns: [
                'Are there competing moral values?',
                'How do we balance different ethical considerations?'
              ]
            }
          }
        ]
      },
      {
        name: 'Systems Lens',
        attributes: {
          description: 'Holistic view of complex interactions',
          focus: 'How do different components interconnect?'
        },
        children: [
          {
            name: 'Feedback Loops',
            attributes: {
              description: 'Identifying recursive and circular dependencies',
              key_questions: [
                'How do changes in one part affect the whole?',
                'Are there unintended consequences?'
              ]
            }
          },
          {
            name: 'Long-term Projections',
            attributes: {
              description: 'Modeling potential future scenarios',
              key_concerns: [
                'What are the extended implications?',
                'How might the system evolve over time?'
              ]
            }
          }
        ]
      }
    ]
  });

  const handleNodeSelect = useCallback((nodeDatum) => {
    setSelectedNode(nodeDatum);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 2, position: 'relative', height: '100%' }}>
        <Tree 
          data={treeData}
          orientation="vertical"
          translate={{ x: 200, y: 100 }}
          renderCustomNodeElement={(props) => (
            <NodeComponent 
              {...props} 
              handleNodeSelect={handleNodeSelect} 
            />
          )}
        />
      </div>
      
      {/* Node Details Panel */}
      <div 
        style={{ 
          flex: 1, 
          padding: '20px', 
          backgroundColor: '#f4f4f4', 
          overflowY: 'auto' 
        }}
      >
        <h3>Node Details</h3>
        {selectedNode ? (
          <div>
            <h4>{selectedNode.name}</h4>
            {selectedNode.attributes && (
              <>
                <p><strong>Description:</strong> {selectedNode.attributes.description}</p>
                
                {selectedNode.attributes.focus && (
                  <p><strong>Focus:</strong> {selectedNode.attributes.focus}</p>
                )}
                
                {selectedNode.attributes.key_questions && (
                  <div>
                    <strong>Key Questions:</strong>
                    <ul>
                      {selectedNode.attributes.key_questions.map((q, index) => (
                        <li key={index}>{q}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedNode.attributes.key_concerns && (
                  <div>
                    <strong>Key Concerns:</strong>
                    <ul>
                      {selectedNode.attributes.key_concerns.map((c, index) => (
                        <li key={index}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <p>Select a node to explore its details</p>
        )}
      </div>
    </div>
  );
};

export default ReasoningTreeGenerator;